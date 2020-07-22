import React from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import {addSubreddit, removeSubreddit} from '../actions';

class ViewPost extends React.Component{
	constructor(props){
		super(props)
		this.state={
			count: 0,
			comments: []
		}
		this.loadComments=this.loadComments.bind(this)
		this.loadMore=this.loadMore.bind(this)
		this.hideComments=this.hideComments.bind(this)
	}
	loadComments=()=>{
	fetch(`https://www.reddit.com/r/${this.props.data.subreddit}/comments/${this.props.data.id}.json`)
		.then(res=> res.json())
		.then(json=> json[1].data.children.map(data=>{
			const {author,body: comment,created,depth,id,replies,ups}=data.data
			let obj={
				author,
				comment,
				created,
				depth,
				id,
				replies,
				ups
			}
			return obj
		}))
		.then(comments=> this.setState({comments,count: this.state.count+10}));
	}
	loadMore=()=>this.setState({count: this.state.count+10})
	hideComments=()=>this.setState({count: 0})
	render(){
		let {id,url,post,caption,username,subreddit,likes,is_video}=this.props.data
		const ext=url.substring(url.length-4,url.length)
		let img=ext==='.jpg' || ext==='.png'|| ext==='.gif' || ext==='gifv'
		if(!img && url.includes('imgur')){
			url+='.png';
			img=true
		}
		is_video=url.includes('youtu')

		return(
			<div className="viewpost">
				<div className="close__btn" onClick={this.props.hidepost}>
					+
				</div>
				<div className="viewpost__post">
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
						<div className="viewpost__textpost">
							<b>{caption}</b>
							{post.substring(0,400)}
							<p>{!post && <a style={{color:'gray'}} href={url} target="_blank">{url}</a>}</p>
						</div>
					}
				</div>
				<div className="viewpost__details">
					<div className="detail__section">
						<b className="viewpost__details-username">r/{subreddit}</b>
						{this.props.subreddits.includes(subreddit)?
							 <span className="followbtn" style={{color: 'gray'}} onClick={()=> this.props.dispatch(removeSubreddit(subreddit))}>unfollow</span>:
							 <span className="followbtn" onClick={()=> this.props.dispatch(addSubreddit(subreddit))}>Follow</span>
						}
					</div>
					<div className="cmnt__section">
						<b>u/{username}</b> &nbsp;
						<span>{caption}</span>
						<Comments 
							count={this.state.count}
							comments={this.state.comments} 
							loadComments={this.loadComments} 
							loadMore={this.loadMore}
							hideComments={this.hideComments}
						/>
					</div>
					<div className="details__footer">
						<b>{likes}&nbsp;{parseInt(likes)>1? "upvotes":"upvote" }</b>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		subreddits: state.subredditReducer.subreddits
	}
}

export default connect(mapStateToProps)(ViewPost);