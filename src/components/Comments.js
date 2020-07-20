import React,{Component} from 'react';

class Comments extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
			{!this.props.count ?
				<p 
					className="link-btn"
					onClick={this.props.loadComments}
				>
					view comments
				</p>:
				<div>
					{this.props.comments.slice(0,this.props.count).map(data=>{
						return (
							<div className="comment" key={data.id}>
								<b>{data.author}</b>&nbsp;
								<span>{data.comment}</span>
								<b className="comment-ups">+{data.ups}</b>
							</div>
						)
					  })
					 }
					  {this.props.count<this.props.comments.length ? 
					  	<p className="link-btn" onClick={this.props.loadMore}>view more</p>:
					  	<p className="link-btn" onClick={this.props.hideComments}>hide comments</p>}
			  </div>
			}
			</div>
		);
	}
}

export default Comments;