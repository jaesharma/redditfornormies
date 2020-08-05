import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
	StyledUserInfoContainer,
	StyledUserInfo,
	StyledUserInfoText,
	StyledUserAvatar,
	StyledUserName,
	StyledSuggestions,
	StyledSuggestion,
	StyledSuggestionText,
	StyledUserInfoFooter,
} from '../styles/components/userStyles';
import {StyledAddBtn} from '../styles/components/searchbarStyles';

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
			<StyledUserInfoContainer>
				<StyledUserInfo>
						<StyledUserAvatar
							src={this.props.user.icon_img}
							alt="user-avatar"
						/>
					<StyledUserInfoText>
						<NavLink to="/user" className="username">u/{this.props.user.name}</NavLink>
						<p className="name">{this.props.user.name}</p>
					</StyledUserInfoText>
				</StyledUserInfo>
				<StyledSuggestions>
					<b>Suggestions For You</b>
					{
						Object.entries(this.state.suggestions).map(([key,value],index)=>{
							const {id,title,icon_img,subscribers}=value
							return(
								<StyledSuggestion key={id}>
									<img src={icon_img}/>
									<StyledSuggestionText>
										<NavLink to={`/r/${title}`} className="suggestionTextTitle">{title}</NavLink>
										<p>{subscribers}</p>
									</StyledSuggestionText>
								</StyledSuggestion>
							);
						},that)
					}
				</StyledSuggestions>
				<StyledUserInfoFooter>
					<NavLink to="#" className="footertext">About</NavLink>
					<a className="footertext" target="_blank" href="https://github.com/jaesharma/redditfornormies">Github</a>
					<p>&#169; REDDIT FROM PARALLEL TIMELINE</p>
				</StyledUserInfoFooter>
			</StyledUserInfoContainer>
		);
	}
}

const mapStateToProps=(state)=>{
	return{
		user: state.authenticationReducer.user
	}
}

export default connect(mapStateToProps)(User);