import React,{Component} from 'react';
import {StyledComment, StyledCommentUps, StyledLinkBtn} from '../styles/components/commentStyles';

class Comments extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
			{!this.props.count ?
				<StyledLinkBtn
					onClick={this.props.loadComments}
				>
					view comments
				</StyledLinkBtn>:
				<div>
					{this.props.comments.slice(0,this.props.count).map((data,index)=>{
						if(!data.hasOwnProperty('comment')) return;
						return (
							<StyledComment key={data.id}>
								<div>
									<b>{data.author}</b>&nbsp;
									<span>{data.comment}</span>
								</div>
								<div>
									{data.author===this.props.username && <span className="opt" type="optcanvas" onClick={(e)=>this.props.toggleOpt(e,data.name,index)}>...</span>}
									<StyledCommentUps>+{data.ups}</StyledCommentUps>
								</div>
							</StyledComment>
						)
					  })
					 }
					  {this.props.count<this.props.comments.length ? 
					  	<StyledLinkBtn onClick={this.props.loadMore}>view more</StyledLinkBtn>:
					  	<StyledLinkBtn onClick={this.props.hideComments}>hide comments</StyledLinkBtn>}
			  </div>
			}
			</div>
		);
	}
}

export default Comments;