import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addSubreddit, select_subreddit, fetchPosts} from '../actions';
import {StyledSubContainer, StyledSub, StyledSubIcon} from '../styles/components/redditorStyles';
import {StyledAddBtn} from '../styles/components/searchbarStyles';

class RenderSubs extends Component{
	constructor(props){
		super(props);
		this.switchSub=this.switchSub.bind(this);
	}

    switchSub=(e)=>{
    	this.props.dispatch(select_subreddit(e.target.name))
    	this.props.dispatch(fetchPosts(e.target.name))
    }

	render(){

	 const that=this
	 return(
		<StyledSubContainer>
			<StyledAddBtn size="big" onClick={this.props.focusTextInput}>
				+
			</StyledAddBtn>
			 {
			 	Object.entries(this.props.subs).reverse().map(([subName,sub],index)=>{
			 		return (
			 			<StyledSub key={index}>
				 			<StyledSubIcon name={subName} onClick={this.switchSub} src={sub.icon}/>
					 		<p className={that.props.activeSub==subName? 'sub__name sub__name-active': 'sub__name'}>
					 			<b>r/{subName.substring(0,8)}{subName.length>8 && <span>..</span>}</b>
					 		</p>
				 		</StyledSub>
			 		);
			 	},that)
			}
		</StyledSubContainer>
	  ) 
	}
}

export default connect()(RenderSubs);