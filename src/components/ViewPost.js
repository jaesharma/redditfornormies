import React from 'react';
import {connect} from 'react-redux';
import {NavLink,withRouter} from 'react-router-dom';
import Comments from './Comments';
import OptTab from './OptTab';
import {upvote, downvote} from '../actions';
import {editText, deleteCall} from '../actions/api-calls';
import store from '../store';import { useLocation } from 'react-router-dom'
import {addSubreddit, removeSubreddit} from '../actions';
import {StyledBtnImg} from '../styles/components/headerStyles';
import {StyledViewPostContent,
		StyledViewPostDetails,
		StyledCommentSection,
		StyledDetailsFooter,
		StyledDetailSection,
		StyledVPTextPost,
		StyledVPCloseBtn,
		StyledPostHead,
		StyledFollowBtn} from '../styles/components/viewPostStyles';
import {StyledCanvas} from '../styles/components/tabStyles';
import {StyledCommentBox, StyledCommentInput, StyledPostButton} from '../styles/components/commentStyles';

class ViewPost extends React.Component{
	constructor(props){
		super(props)
		this.state={
			count: 0,
			comments: [],
			id_in_scope: undefined,
			index_in_scope: undefined,
			showopt: false,
			value: '',
		}
		this.commentRef=React.createRef();
		this.loadComments=this.loadComments.bind(this)
		this.loadMore=this.loadMore.bind(this)
		this.hideComments=this.hideComments.bind(this)
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
	del_comment=()=>{
		let comments=this.state.comments
		comments.splice(this.state.index_in_scope,1)
		deleteCall(this.props.auth.access_token,this.state.id_in_scope)
		this.setState({comments,id_in_scope: false,index_in_scope: false})
	}
	loadComments=(cmnt='')=>{
	fetch(`https://www.reddit.com/r/${this.props.data.subreddit}/comments/${this.props.data.id}.json`)
		.then(res=> res.json())
		.then(json=> json[1].data.children.map(data=>{
			const {author,body: comment,created,depth,name,id,replies,ups}=data.data
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
				console.log(">> ",comments)
				this.setState({comments,count: this.state.count+10})}
		);
	}
	handleUpvote=(token,id,name,score,likes)=>{
		this.props.dispatch(upvote(token,id,name,score,likes))
		if(store.getState().postReducer.posts.hasOwnProperty(id)){
			const {score,likes}=store.getState().postReducer.posts[id]
			this.props.handleChanges(id,score,likes)
		}
	}
	handleDownvote=(token,id,name,score,likes)=>{
		this.props.dispatch(downvote(token,id,name,score,likes))
		if(store.getState().postReducer.posts.hasOwnProperty(id)){
			const {score,likes}=store.getState().postReducer.posts[id]
			this.props.handleChanges(id,score,likes)
		}
	}
	loadMore=()=>this.setState({count: this.state.count+10})
	hideComments=()=>this.setState({count: 0})

	handleCloseSettings=(e)=>{
		if(e.target.getAttribute('type')==="canvas"){
			this.props.hidePost()
		}
	}

	toggleOpt=(e,full_name=undefined)=>{
		if(e.target.getAttribute('type')==="optcanvas"){
			this.setState(prevState=>({showopt: !prevState.showopt,id_in_scope: full_name}))
		}
	}
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
			const {author,body: comment,created,depth,name,id,replies,ups}=json
			let obj={
				author,
				comment,
				created,
				name,
				depth,
				id,
				replies,
				ups
			}
			this.loadComments(obj)
		})
		.catch(err=>{
			console.log('something went wrong',err)
		})
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
	render(){
		let token=this.props.auth.access_token
		let {id,name,url,post,caption,username,subreddit,ups,likes,score,is_video}=this.props.data
		const ext=url.substring(url.length-4,url.length)
		let img=ext==='.jpg' || ext==='.png'|| ext==='.gif' || ext==='gifv'
		if(!img && url.includes('imgur')){
			url+='.png';
			img=true
		}
		is_video=url.includes('youtu')

		return(
			<StyledCanvas type="canvas" onClick={(e)=>this.handleCloseSettings(e)}>
				{this.state.showopt && <OptTab editComment={this.editComment} del_comment={this.del_comment} toggleOpt={this.toggleOpt}/>}
				<StyledVPCloseBtn onClick={this.props.hidePost}>
					+
				</StyledVPCloseBtn>
				<StyledViewPostContent>
					<StyledPostHead>
						<StyledDetailSection>
						{
							this.props.location.pathname===`/r/${this.props.data.subreddit}` &&
							<b className="details__username">r/{subreddit}</b>
							|| <NavLink to={`/r/${subreddit}`} className="details__username"><b >r/{subreddit}</b></NavLink>

						}
						{this.props.subreddits.includes(subreddit)?
							 <StyledFollowBtn style={{color: 'gray'}} onClick={()=> this.props.dispatch(removeSubreddit(subreddit))}>unfollow</StyledFollowBtn>:
							 <StyledFollowBtn onClick={()=> this.props.dispatch(addSubreddit(subreddit))}>Follow</StyledFollowBtn>
						}
						</StyledDetailSection>
					</StyledPostHead>
					{
						img &&
						<img src={url} alt="post"/>
					}
					{is_video &&
							<iframe
	 						className="viewpost-frame" width="100%" height="100%"
							src={url.replace(/youtu\.be\/|youtube\.com\/watch\?v\=/,'youtube.com/embed/')}>
							</iframe>
					}
					{ !img && !is_video &&
						<StyledVPTextPost>
							<b>{caption}</b>
							{post.substring(0,400)}
							<p>{!post && <a style={{color:'gray'}} href={url} target="_blank">{url}</a>}</p>
						</StyledVPTextPost>
					}
				</StyledViewPostContent>
				<StyledViewPostDetails>
					<StyledDetailSection>
					{
						this.props.location.pathname===`/r/${this.props.data.subreddit}` &&
						<b className="details__username">r/{subreddit}</b>
						|| <NavLink to={`/r/${subreddit}`} className="details__username"><b >r/{subreddit}</b></NavLink>

					}
						{this.props.subreddits.includes(subreddit)?
							 <StyledFollowBtn style={{color: 'gray'}} onClick={()=> this.props.dispatch(removeSubreddit(subreddit))}>unfollow</StyledFollowBtn>:
							 <StyledFollowBtn onClick={()=> this.props.dispatch(addSubreddit(subreddit))}>Follow</StyledFollowBtn>
						}
					</StyledDetailSection>
					<StyledCommentSection>
						<b>u/{username}</b> &nbsp;
						<span>{caption}</span>
						<Comments 
							count={this.state.count}
							comments={this.state.comments}
							loadComments={this.loadComments} 
							loadMore={this.loadMore}
							username={this.props.auth.user.name}
							toggleOpt={this.toggleOpt}
							hideComments={this.hideComments}
						/>

					</StyledCommentSection>
					<StyledDetailsFooter>
						{ this.props.auth.authenticated && 
							<div className="footerbtns">
								<StyledBtnImg type="upvote" onClick={()=>this.handleUpvote(token,id,name,score,likes)} src={likes? "/images/upvote-active.png": "/images/upvote.png"}/>
								<StyledBtnImg type="downvote" onClick={()=>this.handleDownvote(token,id,name,score,likes)} src={likes===false? "/images/downvote-active.png": "/images/upvote.png"}/>
							</div>
						}
						<b>{score} {parseInt(score)>1 && "upvotes" || "upvote"}</b>
						{
							this.props.auth.authenticated &&
							<StyledCommentBox>
								<StyledBtnImg src={this.props.auth.user.icon_img}/>
								<StyledCommentInput 
									type="text" 
									ref={this.commentRef}
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
					</StyledDetailsFooter>
				</StyledViewPostDetails>
			</StyledCanvas>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		subreddits: state.subredditReducer.subreddits,
		auth: state.authenticationReducer,
		posts: state.postReducer.posts
	}
}

export default withRouter(connect(mapStateToProps)(ViewPost));