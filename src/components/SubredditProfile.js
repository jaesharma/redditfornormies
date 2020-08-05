import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getobj} from '../actions';
import Menubar from './Menubar';
import PostCard from './PostCard';
import Cookies from 'js-cookie';
import ViewPost from './ViewPost';
import FollowingTab from './FollowingTab';
import debounce from "lodash.debounce";
import {addSubreddit, removeSubreddit} from '../actions';
import {sub, unsub} from '../actions/api-calls';

import {StyledProfile,
		StyledProfileInfo,
		StyledProfileName,
		StyledProfileDetails,
		StyledProfilePosts,
		StyledProfileIcon,
		StyledProfileGallery,
		StyledButton,
		StyledLoader} from '../styles/components/profileStyles';

class SubredditProfile extends React.Component{
	constructor(props){
		super(props);
		this.state={
			subdetails: {},
			posts: {},
			after: undefined,
			loading: false,
			currPostId: undefined,
			viewPost: false,
			subscriberTab: false
		}
    	window.onscroll=debounce(()=>{
			if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.scrollHeight){
				this.setState({loading: true})
				this.loadposts()
			}
		},100)
		this.loadContext=this.loadContext.bind(this)
		this.viewPost=this.viewPost.bind(this)
		this.hidePost=this.hidePost.bind(this)
		this.closeftab=this.closeftab.bind(this)
		this.unlisten = this.props.history.listen((location, action) => {
			this.setState({posts: {},after: undefined})
      		this.loadContext(location.pathname)
			this.loadposts(location.pathname);
      		this.forceUpdate()
    	});
	}
	getObj=(data)=>{
		const {id,title,created,description,name: full_name, display_name: name,header_img,icon_img,public_description,subscribers,banner_background_color}=data
		const obj={
			id,
			title,
			created,
			description,
			name,
			full_name,
			header_img,
			icon_img,
			public_description,
			subscribers,
			banner_background_color
		}
		return obj
	}

	viewPost(id){
		this.setState({viewPost: true,currPostId: id})
	}
	hidePost(){
		this.setState({viewPost: false,currPost: {}})
	}
	closeftab(){
		this.setState({followingTab: false})
	}

	loadContext(location=`r/${this.props.match.params.subreddit}`){
		fetch(`https://www.reddit.com/${location}/about/.json`)
			.then(res=> res.json())
			.then(json=> this.getObj(json.data))
			.then(data=> this.setState({subdetails: data}))
			.catch(err=>{ return })
	}
	loadposts(subreddit=this.props.match.params.subreddit){
		if(this.props.authenticated){
			const token=this.props.access_token
			var fetchedPosts={}
			fetch(`https://oauth.reddit.com/r/${subreddit}/new`,{
				method: 'GET',
				headers: {
					Authorization: `bearer ${token}`,
      				'Content-Type':'application/x-www-form-urlencoded'
				}
			})
			.then(res=>res.json())
			.then(json=> {
					this.setState({after: json.data.after})
					json.data.children.map(child=>{
						Object.assign(fetchedPosts,getobj(child.data))
				})
			})
			.then(posts=> this.setState({posts: fetchedPosts}))
			.catch(err=> console.log("error while fetching posts from ",subreddit,err))
		}else{
			fetch(`https://www.reddit.com/r/${this.props.match.params.subreddit}/.json?limit=7&after=${this.state.after}`)
			.then(res=> res.json())
			.then(json=> json.data)
			.then(data=>{
				data.children.map(post=>{
					const posts={...this.state.posts,...getobj(post.data)}
					this.setState({posts,after: data.after})
				})
			})
			.then(wait=> this.setState({loading: false}))
			.catch(err=> {console.log(err); this.setState({loading: false})})
		}
	}
	unsubHandler=()=>{
		this.props.dispatch(removeSubreddit(this.props.match.params.subreddit))
		if(this.props.authenticated){
			unsub(this.props.access_token,this.state.subdetails.full_name)
		}
	}
	subHandler=()=>{
		this.props.dispatch(addSubreddit(this.props.match.params.subreddit))
		if(this.props.authenticated){
			sub(this.props.access_token,this.state.subdetails.full_name)
		}
	}
	handleChanges=(id,score,likes)=>{
		this.setState(prevState=>({
			posts:{
				...prevState.posts,
				[id]:{
					...prevState.posts[id],
					score,
					likes
				}
			}
		}))
	}
	componentDidMount(){
		this.loadContext();
		this.loadposts();
	}

	componentWillUnmount(){
		console.log('unmount called')
		this.unlisten()
	}
	render(){
		let subreddit=this.props.match.params.subreddit
		let {id,title,created,description,name,header_img,icon_img,public_description,subscribers,banner_background_color}=this.state.subdetails
		if(icon_img===''){
			icon_img="/images/icon.png"
		}
		return(
			<div>
				<Header ishome={true}/>
				{this.state.viewPost && 
					<ViewPost 
						handleChanges={this.handleChanges} 
						hidePost={this.hidePost} 
						data={this.state.posts[this.state.currPostId]}
					/>
				}
				{this.state.followingTab && 
					<FollowingTab 
						dispatch={this.props.dispatch}
						closeftab={this.closeftab}
						followings={this.props.subdata}
					/>
				}
				<StyledProfile>
					<StyledProfileInfo>
						<StyledProfileIcon
							src={icon_img}
						/>
						<StyledProfileDetails>
							<div>
								<StyledProfileName>{`r/${subreddit}`}</StyledProfileName>
								{
									this.props.subreddits.includes(subreddit)? 
										<StyledButton 
											type="secondary"
											onClick={()=>this.unsubHandler()}>
											unfollow
										</StyledButton>
										:
										<StyledButton
											type="primary"
											onClick={()=>this.subHandler()}>
											Follow
										</StyledButton>
								}
							</div>
							<div>
								<p><b>{this.state.subdetails.subscribers}</b> followers</p>
							</div>
							<b>{title}</b>
							<p style={{overflowWrap: "break-word"}}>{public_description}</p>
						</StyledProfileDetails>
					</StyledProfileInfo>
					<StyledProfilePosts>
						<StyledProfileGallery>
							{
								Object.entries(this.state.posts).map(([key,value],index)=>{
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
		authenticated: state.authenticationReducer.authenticated,
		access_token: state.authenticationReducer.access_token
	}
}

export default connect(mapStateToProps)(SubredditProfile);