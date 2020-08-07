import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getobj} from '../actions';
import Menubar from './Menubar';
import PostCard from './PostCard';
import Cookies from 'js-cookie';
import ViewPost from './ViewPost';
import FollowingTab from './FollowingTab';
import Trophies from './Trophies';
import Settings from './Settings';
import debounce from "lodash.debounce";
import {addSubreddit, removeSubreddit, logout} from '../actions';
import {StyledProfile,
		StyledProfileInfo,
		StyledProfileName,
		StyledProfileDetails,
		StyledProfilePosts,
		StyledProfileIcon,
		StyledButton,
		StyledInfoBlock,
		StyledProfileGallery,
		StyledInlineDiv,
		StyledLoginBoard,
		StyledLoader} from '../styles/components/profileStyles';
import {StyledBtnImg} from '../styles/components/headerStyles';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data: {},
			after: undefined,
			loading: false,
			currPost: {},
			viewPost: false,
			datafetched: false,
			followingTab: false,
			settings: false,
			trophies: false
		}
		window.onscroll=debounce(()=>{
			if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.scrollHeight+12){
				this.setState({loading: true})
			}
		},100)
		this.viewPost=this.viewPost.bind(this)
		this.hidepost=this.hidepost.bind(this)
	}

	viewPost(data){
		this.setState({viewPost: true,currPost: data})
	}
	hidepost(){
		this.setState({viewPost: false,currPost: {}})
	}
	closeTab=(entity)=>{
		this.setState({[entity]: false})
	}
	trophies=()=>{
		this.setState(prevState=>({trophies: !prevState.trophies}))
	}
	settings=()=>{
		this.setState(prevState=>({settings: !prevState.settings}))
	}
	logoutHandler=()=>{
		this.props.dispatch(logout())
		const cookies=JSON.parse(Cookies.get('subreddits'))

		if(cookies){
			cookies.map(sub=>{
				this.props.dispatch(addSubreddit(sub))
			})
		}
	}
	getUserInfo=()=>{
		fetch(`https://oauth.reddit.com/api/v1/me`,{
			method: 'GET',
			headers: {
				Authorization: `bearer ${this.props.access_token}`
			}
		})
		.then(res=>res.json())
		.then(json=> {
			const {icon_img,id,name,num_friends,pref_nightmode}=json
		})
		.catch(err=>{
			console.log('something went wrong',err)
		})
	}
	componentDidMount(){
		this.getUserInfo()
	}
	render(){
		let {authenticated, user}=this.props.authdata
		return(
			<div>
				<Header ishome={true}/>
				{this.state.viewPost && <ViewPost hidepost={this.hidepost} data={this.state.currPost}/>}
				{this.state.followingTab && 
					<FollowingTab 
						dispatch={this.props.dispatch}
						closeTab={this.closeTab}
						followings={this.props.subdata}
					/>
				}
				{
					this.state.trophies &&
						<Trophies 
							token={this.props.access_token}
							closeTab={this.closeTab}
						/>
				}
				{
					this.state.settings &&
						<Settings closeTab={this.closeTab}/>
				}
				<StyledProfile>
					<StyledProfileInfo>
						<StyledProfileIcon
							src={user.icon_img}
						/>
						<StyledProfileDetails>
							<div className="userdetails">
								<StyledProfileName>{`u/${user.name}`}</StyledProfileName>
								<StyledBtnImg src={this.props.nightmode? "/images/trophy-light.png": "/images/trophy.png"} onClick={()=>this.trophies()} alt="trophies" type="trophies"/>
								<StyledBtnImg src={this.props.nightmode? "/images/settings-light.png": "/images/settings.png"} onClick={()=>this.settings()} alt="settings" type="settings"/>
							</div>
							<StyledInfoBlock>
								<b>{user.fname}</b>
								{
									authenticated && 
									<StyledInlineDiv>
										<StyledBtnImg style={{cursor: 'default'}} src="/images/chakra.png" alt="karma" type="settings"/>
										<span>{this.props.authdata.user.total_karma}</span>
									</StyledInlineDiv>
								}
								<p style={{cursor: 'pointer'}} onClick={()=>this.setState({followingTab: true})}>
									<b>{this.props.subreddits.length}</b> followings
								</p>
							</StyledInfoBlock>
						</StyledProfileDetails>
					</StyledProfileInfo>
					<StyledProfilePosts>
							<StyledLoginBoard>
								{
										authenticated && <StyledButton type="secondary" onClick={()=>this.logoutHandler()}>logout</StyledButton> ||
										<span>
											<p>You are not logged in</p>
											<a style={{textDecoration: "none"}} href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_CLIENTID}&response_type=code&state=d897kjj39&redirect_uri=${process.env.REACT_APP_REDIRECTURI}&scope=account,creddits,edit,flair,history,identity,livemanage,modconfig,modcontributors,modflair,modlog,modmail,modothers,modposts,modself,modwiki,mysubreddits,privatemessages,read,report,save,structuredstyles,submit,subscribe,vote,wikiedit,wikiread&duration=permanent`}>
												<StyledButton type="primary">
													Login
												</StyledButton>
											</a>
										</span>
								}
							</StyledLoginBoard>
							<StyledProfileGallery>
								{
									Object.entries(this.state.data).map(([key,value],index)=>{
										return <PostCard 
											key={key} 
											viewPost={this.viewPost}
											value={value} 
											index={index} />
									})
								}
							</StyledProfileGallery>
					</StyledProfilePosts>
				</StyledProfile>
				<div>{this.state.loading && <StyledLoader type="pageload" size="mid" src="/loaders/spinner.gif"/>}</div>
				<Menubar/>
			</div>
		);
	}
}

const mapStateToProps=(state,props)=>{
	return {
		subreddits: state.subredditReducer.subreddits,
		subdata: state.postReducer.data,
		authdata: state.authenticationReducer,
		access_token: state.authenticationReducer.access_token,
		nightmode: state.settingsReducer.nightmode
	}
}

export default connect(mapStateToProps)(Profile);