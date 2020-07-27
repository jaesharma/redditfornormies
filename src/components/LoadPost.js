import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import Comments from './Comments';

class LoadPost extends Component{
	constructor(props){
		super(props);
		this.state={
			expanded: false,
			comments: [],
			count: 0
		}
		this.readMore=this.readMore.bind(this);
		this.loadMore=this.loadMore.bind(this);
		this.loadComments=this.loadComments.bind(this);
		this.hideComments=this.hideComments.bind(this);
	}
	readMore=(e)=>(
		this.setState({
			expanded: true
		})
	);
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
		const ishome=this.props.ishome
		let {id,url,post,caption,username,subreddit,likes,is_video}=this.props.data
		const ext=url.substring(url.length-4,url.length)
		let img=ext==='.jpg' || ext==='.png'|| ext==='.gif' || ext==='gifv'
		if(!img && url.includes('imgur')){
			url+='.png';
			img=true
		}
		is_video=url.includes('youtu')
		return (
			<div className="post-container">
				<div className="post-top">
					{
						ishome ? <NavLink to={`/r/${subreddit}`} style={{color:'black'}} className="post-top__username">r/{subreddit}</NavLink> :
								 <div className="post-top__username">u/{username}</div>
					}
				</div>
				<div className="post-mid">
					{is_video &&
						<iframe
 						width="100%" height="345"
						src={url.replace(/youtu\.be\/|youtube\.com\/watch\?v\=/,'youtube.com/embed/')}>
						</iframe>
					}
					{ img && 
						<img className="post-img" src={url}  onError={(e)=>e.target.src='https://pics.me.me/couldnt-load-image-tap-to-retry-15674211.png'}/>
					}
					{!img && !is_video && <p className="text-post">
					  	{post}
					  	{!post && <a href={url}>{url}</a>}
					  </p>
					}
				</div>
				<div className="post-bottom">
					<b>{likes} {parseInt(likes)>1? `upvotes`: `upvote`}</b>
					<div className="post-footer">
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
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default LoadPost;