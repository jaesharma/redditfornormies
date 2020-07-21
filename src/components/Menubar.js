import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {deselect_subreddit} from '../actions';

const Menubar=(props)=>{
	return(
		<div className="menubar">
			<NavLink to="/"><img onClick={()=>props.dispatch(deselect_subreddit())} className="btn btn-home" src="./../../images/home.png" alt="home" /></NavLink>
			<NavLink to="/explore"><img className="btn btn-compas" src='./../../images/compas.png' alt="explore"/></NavLink>
			<img className="btn btn-like" src='./../../images/like.png' alt="notifications"/>
			<NavLink to="/user"><img className="profile-icon" src="https://theme.zdassets.com/theme_assets/2219439/89cbe072bbb76fc29a82367bd19b511df487d018.png"/></NavLink>
		</div>
	);
}

export default connect()(Menubar);