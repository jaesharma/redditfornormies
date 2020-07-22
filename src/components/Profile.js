import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getobj} from '../actions';
import Menubar from './Menubar';
import PostCard from './PostCard';
import debounce from "lodash.debounce";

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data: {},
			after: undefined,
			loading: false,
			datafetched: false
		}
		this.setDetails=this.setDetails.bind(this)
		window.onscroll=debounce(()=>{
			if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.scrollHeight){
				this.setState({loading: true})
				this.setDetails()
			}
		},100)
	}

	setDetails(){
		fetch(`https://www.reddit.com/${this.props.data.name}/.json?limit=1&after=${this.state.after}`)
			.then(res=> res.json())
			.then(json=> json.data)
			.then(data=>{
				data.children.map(post=>{
					const obj={...this.state.data,...getobj(post.data)}
					this.setState({data: obj,after: data.after})
				})
			})
			.then(wait=> this.setState({datafetched: true,loading: false}))
			.catch(err=> {console.log(err); this.setState({loading: false})})
	}
	render(){
		let {isuser,id,title,created,description,name,header_img,icon_img,public_description,subscribers,banner_background_color}=this.props.data
		if(icon_img===''){
			icon_img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUmib4qKsK8tRCq5aahbTKKFnsUCxv3Ep8qg&usqp=CAU"
		}
		if(!this.state.datafetched && !isuser) this.setDetails()
		return(
			<div>
				<Header ishome={true}/>
				<div className="profile">
					<div className="profile-info">
						<img 
							className="profile-icon" 
							src={icon_img}
						/>
						<div className="profile-details">
							<p className="profile__name">{this.props.data.name}</p>
							<div>
								{isuser && <p><b>0</b> posts</p>}
								{isuser? <p><b>{this.props.subreddits.length}</b> subscribed</p>:
										 <p><b>{this.props.data.subscribers}</b> subscribers</p>	 
								}
							</div>
							{isuser? <b className="profile__username">reddit user</b>:
								<b className="profile__username">{title}</b>
							}
							{!isuser && <p className="profile__description">{public_description}</p>}
						</div>
					</div>
					<div className="profilePosts">
						{isuser? <p>No Posts Yet</p>:
							<div className="profile-gallery">
								{
									Object.entries(this.state.data).map(([key,value],index)=>{
										return <PostCard key={key} value={value} index={index} />
									})
								}
							</div>
						}
					</div>
				</div>
				<div>{this.state.loading && <img className="mid-loader" src="https://i.gifer.com/ZZ5H.gif"/>}</div>
				<Menubar/>
			</div>
		);
	}
}

const mapStateToProps=(state,props)=>{
	return {
		subreddits: state.subredditReducer.subreddits
	}
}

export default connect(mapStateToProps)(Profile);