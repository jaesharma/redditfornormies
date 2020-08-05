import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {deselect_subreddit} from '../actions';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import styled from 'styled-components';
import {StyledHeader, StyledHeaderBtns, StyledBtnImg} from '../styles/components/headerStyles';

class Header extends Component{
	constructor(props){
		super(props)
		this.state={
			showNotification: false
		}
		this.wrapperRef = React.createRef();
	}
	handleClickOutside=(event)=>{
		const that=this
        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
        	 setTimeout(function(){that.setState({showNotification: false})},100,that)
        }else{
        	this.setState({showNotification: !this.state.showNotification})
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
	render(){
		return (
			<div>
				<StyledHeader>
					<NavLink to="/" className="header-text"><p onClick={()=>this.props.dispatch(deselect_subreddit())}>@reddit</p></NavLink>
					<Searchbar ishome={this.props.ishome} textInputRef={this.props.textInputRef} focusTextInput={this.props.focusTextInput}/>
					<StyledHeaderBtns>
						<NavLink to="/"><StyledBtnImg onClick={()=>this.props.dispatch(deselect_subreddit())} type="home" src={this.props.nightmode? '/images/home-light.png': "/images/home.png"} alt="home" /></NavLink>
						{  this.props.isAuthenticated && 
							<NavLink to="/inbox"><StyledBtnImg type="inbox" src={this.props.nightmode? '/images/dm-light.png': '/images/dm.png'} alt="inbox"/></NavLink>
						}
						<NavLink to="/explore"><StyledBtnImg type="compas" src={this.props.nightmode? '/images/compas-light.png': '/images/compas.png'} alt="explore"/></NavLink>
						<StyledBtnImg type="like" ref={this.wrapperRef} src={this.props.nightmode? '/images/like-light.png': '/images/like.png'} alt="notifications"/>
						<NavLink to="/user"><StyledBtnImg src={this.props.icon_img}/></NavLink>
					</StyledHeaderBtns>
				</StyledHeader>
				{this.props.isAuthenticated && this.props.hasOwnProperty('dashboard') && 
						<NavLink to="/inbox"><StyledBtnImg type="headerInbox" src={this.props.nightmode? '/images/dm-light.png': '/images/dm.png'} alt="inbox"/></NavLink>
				}
				{this.state.showNotification && <Notificationbar token={this.props.access_token}/>}
			</div>
		);
	}
}

const mapStateToProps=(state,props)=>{
	return {
		icon_img: state.authenticationReducer.user.icon_img,
		isAuthenticated: state.authenticationReducer.authenticated,
		access_token: state.authenticationReducer.access_token,
		nightmode: state.settingsReducer.nightmode
	}
}

export default connect(mapStateToProps)(Header);