import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addSubreddit, select_subreddit, fetchPosts} from '../actions';

class RenderSubs extends Component{
	constructor(props){
		super(props);
		this.handleAddSub=this.handleAddSub.bind(this);
		this.switchSub=this.switchSub.bind(this);
	}

	handleAddSub=(e)=>{
	    let subToBeAdded=prompt("add sub")
	    subToBeAdded && this.props.dispatch(addSubreddit(subToBeAdded))
    	this.props.dispatch(fetchPosts(subToBeAdded))
    	this.props.dispatch(select_subreddit(subToBeAdded))
    }

    switchSub=(e)=>{
    	this.props.dispatch(select_subreddit(e.target.name))
    	this.props.dispatch(fetchPosts(e.target.name))
    }

	render(){

	 const that=this
	 return(
		<div className="sub-container">
			<span onClick={this.props.focusTextInput} className="add-sub">
				+
			</span>
			 {
			 	Object.entries(this.props.subs).reverse().map(([subName,sub],index)=>{
			 		return (
			 			<div key={index} className="sub">
				 			<img className="sub__icon" name={subName} onClick={this.switchSub} src={sub.icon}/>
					 		<p className={that.props.activeSub==subName? 'sub__name sub__name-active': 'sub__name'}><b>r/{subName.substring(0,8)}{subName.length>8 && <span>..</span>}</b></p>
				 		</div>
			 		);
			 	},that)
			}
		</div>
	  ) 
	}
}

export default connect()(RenderSubs);