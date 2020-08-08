import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {StyledPageHeading, StyledPageCanvas,Styledbody} from '../styles/components/pageStyles';
import {StyledBtnImg} from '../styles/components/headerStyles';
import {StyledNotification, StyledNFooter} from '../styles/components/notificationbarStyles'
import Menubar from './Menubar';

class Notifications extends React.Component{
	constructor(props){
		super(props);
		this.state={
			notifications:[]
		}
	}
	componentDidMount(){
		return fetch(`https://oauth.reddit.com/message/inbox`,{
			method: 'GET',
			headers: {
				Authorization: `bearer ${this.props.token}`
			}
		})
		.then(res=>res.json())
		.then(json=> {
			const after=json.data.after
			let notifications=json.data.children.map(child=>{
				const {author,body,created,id,link_title,num_comments,subreddit_name_prefixed: subreddit,subject}=child.data
				const obj={
					author,
					body,
					created,
					id,
					link_title,
					num_comments,
					subreddit,
					subject
				}
				return obj
			})
			this.setState({notifications})
		})
		.catch(err=>{
			console.log('something went wrong',err)
		})
	}
	render(){
		console.log("nightmode: ",this.props.nightmode)
		return(
			<StyledPageCanvas>
				<StyledPageHeading>
					<h3>Activity</h3>
				</StyledPageHeading>
				{
					this.props.authenticated && 
					<Styledbody style={{marginTop: "4rem",marginBottom: "3rem"}}>
					{
						this.state.notifications.map(notification=>{
							return(
								<StyledNotification key={notification.id}>
									<p><b>{notification.author}</b>&nbsp;
									{notification.subreddit && <span>({notification.subreddit})</span>}</p>
									<StyledNFooter>
										<p>{notification.subject}</p>
										{
											notification.num_comments &&
											<div>
												<StyledBtnImg type="comment" src={this.props.nightmode? "/images/comment-light.png": '/images/comment.png'} alt="comments"/>
												{notification.num_comments}
											</div>
										}
										<p>{moment.unix(notification.created).format("DD/MM HH:mm")}</p>
									</StyledNFooter>
								</StyledNotification>
							);
						})
					}
					</Styledbody> ||
					<Styledbody style={{marginTop: "4rem",justifyContent: "center",alignItems: "center"}}>
						<h3>You are not logged in</h3>
					</Styledbody>
				}
				<Menubar/>
			</StyledPageCanvas>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		authenticated: state.authenticationReducer.authenticated,
		token: state.authenticationReducer.access_token,
		nightmode: state.settingsReducer.nightmode
	}
}

export default connect(mapStateToProps)(Notifications);