import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {playground} from '../actions/api-calls';
import {StyledDM,
		StyledDMUsers,
		StyledDMHead,
		StyledDMUserThread,
		StyledMessages,
		StyledChatHome,
		StyledUser} from '../styles/components/inboxStyles';

class Inbox extends React.Component{
	constructor(props){
		super(props)
		this.state={
			show_chat_for: undefined,
			obj:{}
		}
	}
	showChatFor=(id)=>{
		this.setState({show_chat_for: id})
	}
	playground=(token)=>{
		fetch(`https://oauth.reddit.com/api/v1/me/trophies`,{
		method: 'GET',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
		.then(res=> res.json())
		.then(json=> console.log(json))
	}
	render(){
		return(
			<div>
				<Header ishome={true}/>
				<StyledDM>
					<StyledDMUsers>
						<StyledDMHead>
							<p>Direct</p>
						</StyledDMHead>
						<StyledDMUserThread>
						{
							Object.entries(this.state.obj).map(([key,val],index)=>{
								return(
									<StyledUser onClick={()=>this.showChatFor(key)}>
										<img src={val.profile}/>
										<p>{val.name}</p>
									</StyledUser>
								);
							})
						}
						</StyledDMUserThread>
					</StyledDMUsers>
					<StyledMessages>
						{
							!!!this.state.show_chat_for ?
							<StyledChatHome>
								<img src='/images/dm.png'/>
								<h2>Your Messages</h2>
								<p>Send private messages to a reddit user</p>
								<button onClick={()=>this.playground(this.props.access_token)}>playground</button>
							</StyledChatHome>
							:
							<div>
								showing chat for {this.state.show_chat_for}
							</div>
						}
					</StyledMessages>
				</StyledDM>
			</div>
		);
	}
}

const mapStateToProps=(state)=>{
	return{
		access_token: state.authenticationReducer.access_token
	}
}

export default connect(mapStateToProps)(Inbox);