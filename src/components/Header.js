import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {deselect_subreddit} from '../actions';
import Searchbar from './Searchbar';

class Header extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="header-main">
				<NavLink to="/" className="header-text"><p onClick={()=>this.props.dispatch(deselect_subreddit())}>@reddit</p></NavLink>
				<Searchbar ishome={this.props.ishome} textInputRef={this.props.textInputRef} focusTextInput={this.props.focusTextInput}/>
				<div className="header-btns">
					<NavLink to="/" ><img onClick={()=>this.props.dispatch(deselect_subreddit())} className="btn btn-home" src="./../../images/home.png" alt="home" /></NavLink>
					<NavLink to="/explore"><img className="btn btn-compas" src='./../../images/compas.png' alt="explore"/></NavLink>
					<img className="btn btn-like" src='./../../images/like.png' alt="notifications"/>
					<NavLink to="/user"><img className="profile-icon" src="https://theme.zdassets.com/theme_assets/2219439/89cbe072bbb76fc29a82367bd19b511df487d018.png"/></NavLink>
				</div>
			</div>
		);
	}
}

export default connect()(Header);