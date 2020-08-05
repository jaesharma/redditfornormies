import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {deselect_subreddit} from '../actions';
import {StyledBtnImg} from '../styles/components/headerStyles';
import {StyledMenubar} from '../styles/components/menubarStyles';

class Menubar extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<StyledMenubar>
				<NavLink to="/"><StyledBtnImg onClick={()=>this.props.dispatch(deselect_subreddit())} type="home" src={this.props.nightmode? "/images/home-light.png": "/images/home.png"} alt="home" /></NavLink>
				<NavLink to="/explore"><StyledBtnImg type="compas" src={this.props.nightmode? "/images/compas-light.png": '/images/compas.png'} alt="explore"/></NavLink>
				<StyledBtnImg type="like" src={this.props.nightmode? "/images/like-light.png": '/images/like.png'} alt="notifications"/>
				<NavLink to="/user"><StyledBtnImg src={this.props.icon_img}/></NavLink>
			</StyledMenubar>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		icon_img: state.authenticationReducer.user.icon_img,
		nightmode: state.settingsReducer.nightmode
	}
}

export default connect(mapStateToProps)(Menubar);