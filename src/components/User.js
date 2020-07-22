import React from 'react';
import {NavLink} from 'react-router-dom';
import {addSubreddit} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';

//hardcoded suggestions
const subs=['memes','history','dankmemes','redditdev',
			'javascript','news','pewdiepiesubmissions','videos']


class User extends React.Component{
	constructor(props){
		super(props)
		this.state={
			suggestions: {}
		}
	}
	getObj=(data)=>{
		const {id,display_name: title,icon_img,subscribers}=data
		let obj={}
		obj[id]={
			id,
			title,
			icon_img,
			subscribers
		}
		return obj
	}
	componentDidMount(){
		const that=this
		_.shuffle(subs).slice(0,5).map(sub=>{
			fetch(`https://www.reddit.com/r/${sub}/about/.json`)
				.then(res=> res.json())
				.then(json=> that.setState({suggestions: {...that.getObj(json.data),...that.state.suggestions}}))
		},that)
	}
	render(){
		const that=this
		return (
			<div className="userinfo-container">
				<div className="userinfo">
						<img 
							className="user-avatar" 
							src="https://theme.zdassets.com/theme_assets/2219439/89cbe072bbb76fc29a82367bd19b511df487d018.png" 
							alt="user-avatar"
						/>
					<div className="userinfo-text">
						<p className="user-username">u/reddituser</p>
						<p className="user-name">reddit user</p>
					</div>
				</div>
				<div className="suggestions">
					<b>Suggestions For You</b>
					{
						Object.entries(this.state.suggestions).map(([key,value],index)=>{
							const {id,title,icon_img,subscribers}=value
							return(
								<div className="sugg" key={id} onClick={()=>that.props.dispatch(addSubreddit(title))}>
									<img src={icon_img}/>
									<div className="sugg-text">
										<b>{title}</b>
										<p>{subscribers}</p>
									</div>
								</div>
							);
						},that)
					}
				</div>
				<div className="userinfo-footer">
					<NavLink to="#"><span className="footer-text">About</span></NavLink>
					<a target="_blank" href="https://github.com/jaesharma/redditfornormies"><span className="footer-text">Github</span></a>
					<p>&#169; REDDIT FROM PARALLEL TIMELINE</p>
				</div>
			</div>
		);
	}
}

export default connect()(User);