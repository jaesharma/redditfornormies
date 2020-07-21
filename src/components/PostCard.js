import React,{Component} from 'react';
import LoadPost from './LoadPost';
import {togglehover} from '../actions';

class PostCard extends Component{
	constructor(props){
		super(props)
		this.state={
			hovering: false
		}
		this.MouseEnter=this.MouseEnter.bind(this)
		this.MouseLeave=this.MouseLeave.bind(this)
	}
	MouseEnter=(e)=>{
		this.setState({hovering: true})
	}
	MouseLeave=(e)=>{
		this.setState({hovering: false})
	}
	render(){
		let {id,url,caption,post,username,subreddit,likes,is_video,hovering}=this.props.value
		const ext=url.substring(url.length-4,url.length)
		let ifimg=ext==='.jpg' || ext==='.png' || ext==='.gif' || ext==='gifv'
		if(!ifimg && url.includes('imgur')){
			url+='.png'
			ifimg=true
		}
		is_video=url.includes('youtu')
		return (
			<div 
				className="explore-post" 
				key={id} 
				onMouseEnter={this.MouseEnter} 
				onMouseLeave={this.MouseLeave}>
				{ this.state.hovering && <h2 className="hover-display">
					<img 
						className="upvote-icon" src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/20691637/original/9c0720e7216da39c1fa320117e5f5645a44334d2/give-you-5-reddit-upvotes-and-a-comment.png"/>
					&nbsp;{likes}</h2>
				}
				{ifimg && 
					<img className="explore__post-img" src={url} alt="" onError={(e)=>e.target.src='https://pics.me.me/couldnt-load-image-tap-to-retry-15674211.png'}/>
				}
				{is_video &&
						<iframe
 						className="post-frame" width="100%" height="100%"
						src={url.replace(/youtu\.be\/|youtube\.com\/watch\?v\=/,'youtube.com/embed/')}>
						</iframe>
				}
				{ !ifimg && !is_video &&
					<div className="explore__textpost">
						<b>{caption}</b>
						{post.substring(0,400)}
						<p>{!post && <a style={{color:'gray'}} href={url} target="_blank">{url}</a>}</p>
					</div>
				}
			</div>
		);
	}
}

export default PostCard;