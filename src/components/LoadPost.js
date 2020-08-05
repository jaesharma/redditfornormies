import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import OptTab from './OptTab';
import Comments from './Comments';
import {upvote, downvote} from '../actions';
import {editText, deleteCall} from '../actions/api-calls';
import {StyledBtnImg} from '../styles/components/headerStyles';
import {StyledCommentBox, StyledCommentInput, StyledPostButton} from '../styles/components/commentStyles';
import {StyledPostContainer, StyledPostTop, StyledPostMid, StyledInlineButtons, StyledPostBottom} from '../styles/components/postStyles';

class LoadPost extends Component{
	constructor(props){
		super(props);
		this.state={
			expanded: false,
			comments: [],
			count: 0,
			data: {},
			id_in_scope: undefined,
			index_in_scope: undefined,
			showopt: false,
			editmode: false,
			value: '',
		}
		this.commentRef=React.createRef();
	}
	readMore=(e)=>(
		this.setState({
			expanded: true
		})
	);
	loadComments=(cmnt='')=>{
		fetch(`https://www.reddit.com/r/${this.props.data.subreddit}/comments/${this.props.data.id}.json`)
			.then(res=> res.json())
			.then(json=> json[1].data.children.map(data=>{
				const {author,body: comment,created,name,depth,id,replies,ups}=data.data
				console.log(data.data)
				let obj={
					author,
					comment,
					created,
					depth,
					name,
					id,
					replies,
					ups
				}
				return obj
			}))
			.then(comments=>{
				let index=comments.length
				Object.assign(comments,{[index]: cmnt},comments)
				this.setState({comments,count: this.state.count+10})}
			);
	}
	loadMore=()=>this.setState({count: this.state.count+10})
	hideComments=()=>this.setState({count: 0})
	postComment=()=>{
		fetch(`https://oauth.reddit.com/api/comment`,{
			method: 'POST',
			headers: {
				'Authorization': `bearer ${this.props.auth.access_token}`,
	      		'Content-Type':'application/x-www-form-urlencoded',
			},
			body: `api_type=json&return_rtjson=true&thing_id=${this.props.data.name}&text=${this.state.value}`
		 })
		.then(res=> res.json())
		.then(json=>{
			this.setState({value: ''})
			const {author,body: comment,created,depth,id,replies,ups}=json
			let obj={
				author,
				comment,
				created,
				depth,
				id,
				replies,
				ups
			}
			console.log("obj: ",obj)
			this.loadComments(obj)
		})
		.catch(err=>{
			console.log('something went wrong',err)
		})
	}
	editComment=()=>{
		let comments=this.state.comments
		let comment=comments.splice(this.state.index_in_scope,1)
		this.setState(prevState=>({showopt: !prevState.showopt,editmode: true,value: comment[0].comment,comments}))
		this.commentRef.current.focus();
	}
	submitEdited=()=>{
		editText(this.props.auth.access_token,this.state.id_in_scope,this.state.value)
		this.setState({value: '',id_in_scope: undefined,index_in_scope: undefined,editmode: false,expanded: false,count: 0})
	}
	CommentChangeHandler=(e)=>{
		this.setState({value: e.target.value})
	}
	_handleKeyDown=(e)=>{
		 if (e.key === 'Enter') {
	      if(this.state.editmode) this.submitEdited();
	      else this.postComment()
	    }
	}
	del_comment=()=>{
		let comments=this.state.comments
		comments.splice(this.state.index_in_scope,1)
		deleteCall(this.props.auth.access_token,this.state.id_in_scope)
		this.setState({comments,id_in_scope: false,index_in_scope: false})
	}
	toggleOpt=(e,full_name=undefined,index=undefined)=>{
		if(e.target.getAttribute('type')==='optcanvas'){
			this.setState(prevState=>({showopt: !prevState.showopt,id_in_scope: full_name,index_in_scope: index}))
		}
	}
	render(){
		const ishome=this.props.ishome
		const token=this.props.auth.access_token
		let {id,name,url,post,caption,username,subreddit,ups,likes,score,is_video}=this.props.data
		const ext=url.substring(url.length-4,url.length)
		let img=ext==='.jpg' || ext==='.png'|| ext==='.gif' || ext==='gifv'
		if(!img && url.includes('imgur')){
			url+='.png';
			img=true
		}
		is_video=url.includes('youtu')
		return (
			<StyledPostContainer>
				{this.state.showopt && <OptTab editComment={this.editComment} del_comment={this.del_comment} toggleOpt={this.toggleOpt}/>}
				<StyledPostTop>
					{
						ishome ? <NavLink to={`/r/${subreddit}`} className="pt__username">
									<StyledBtnImg src={this.props.subinfo[subreddit].icon}/>
									r/{subreddit}
									</NavLink> :
								 <div style={{paddingLeft: "1rem"}} className="pt__username">u/{username}</div>
					}
				</StyledPostTop>
				<StyledPostMid>
					{is_video &&
						<iframe
 						width="100%" height="345"
						src={url.replace(/youtu\.be\/|youtube\.com\/watch\?v\=/,'youtube.com/embed/')}>
						</iframe>
					}
					{ img && 
						<img width="100%" src={url}  onError={(e)=>e.target.src='https://pics.me.me/couldnt-load-image-tap-to-retry-15674211.png'}/>
					}
					{!img && !is_video && <p className="text-post">
					  	{post}
					  	{!post && <a href={url}>{url}</a>}
					  </p>
					}
				</StyledPostMid>
				<StyledPostBottom>
					{ this.props.auth.authenticated && 
						<StyledInlineButtons>
							<StyledBtnImg type="upvote" onClick={()=>this.props.dispatch(upvote(token,id,name,score,likes))} src={likes? "/images/upvote-active.png": "/images/upvote.png"}/>
							<StyledBtnImg type="downvote" onClick={()=>this.props.dispatch(downvote(token,id,name,score,likes))} src={likes===false? "/images/downvote-active.png": "/images/upvote.png"}/>
						</StyledInlineButtons>
					}
					<b>{score} {parseInt(score)>1 && "upvotes" || "upvote"}</b>
					<div>
						{
							this.state.expanded || caption.length<80? 
							<p><span><b>u/{username}</b></span>&nbsp;{caption}</p>:
							<p>
								<span><b>u/{username}</b></span>&nbsp;
								{caption.substring(0,80)}
								<a onClick={this.readMore}>... more</a>
							</p>
						}
						<Comments 
							count={this.state.count}
							comments={this.state.comments} 
							loadComments={this.loadComments} 
							loadMore={this.loadMore}
							hideComments={this.hideComments}
							username={this.props.username}
							toggleOpt={this.toggleOpt}
						/>
						{
							this.props.auth.authenticated && 
							<StyledCommentBox>
								<StyledBtnImg src={this.props.auth.user.icon_img}/>
								<StyledCommentInput 
									ref={this.commentRef}
									type="text" 
									id="#comment_box" 
									onChange={(e)=>this.CommentChangeHandler(e)}
									onKeyDown={this._handleKeyDown}
									placeholder="Add Comment" 
									value={this.state.value}/>
								{
									!this.state.editmode &&
									<StyledPostButton disabled={!!!this.state.value} onClick={()=>this.postComment()}>POST</StyledPostButton> ||
									<StyledPostButton disabled={!!!this.state.value} onClick={()=>this.submitEdited()}>EDIT</StyledPostButton>
								}
							</StyledCommentBox>
						}
					</div>
				</StyledPostBottom>
			</StyledPostContainer>
		);
	}
}

export default connect()(LoadPost);