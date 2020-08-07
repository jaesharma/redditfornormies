import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {StyledDM,
		StyledDMUsers,
		StyledDMHead,
		StyledDMUserThread,
		StyledMessages,
		StyledChatHome,
		StyledUser} from '../styles/components/inboxStyles';
import {StyledBtnImg} from '../styles/components/headerStyles'

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
	render(){
		return(
			<div>
				<Header ishome={true}/>
				<StyledDM>
					<StyledDMUsers>
						<StyledDMHead>
							<StyledBtnImg 
								type="arrow" 
								src={this.props.nightmode? '/images/left-arrow-light.png': '/images/left-arrow.png'} 
								onClick={this.props.history.goBack}
								alt="go_back"
							/>
							<p>Direct</p>
						</StyledDMHead>
						<StyledDMUserThread>
						<h4>
							Reddit does not allow this yet,
							I have plan to implement some type of another chat client here,
							until then, this place is deserted ;_;
						</h4>
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
		access_token: state.authenticationReducer.access_token,
		nightmode: state.settingsReducer.nightmode
	}
}

export default connect(mapStateToProps)(Inbox);