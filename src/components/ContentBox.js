import React from 'react';
import {connect} from 'react-redux';
import LoadPost from './LoadPost';
import {StyledMainWindow, StyledActiveWindow} from '../styles/components/windowStyles.js'

class ContentBox extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const {activeSub, posts, data}=this.props
		const ishome=!!!this.props.activeSub
		if(!ishome){
			var items=data[activeSub].items
		}
		return (
			<StyledMainWindow>
			{
				ishome ? 
				<div>
					{Object.entries(this.props.posts).map(([key,value],index)=>{
						return (
							<div key={value.id}>
								<LoadPost data={value} username={this.props.auth.user.name} subinfo={this.props.subinfo} ishome={true} auth={this.props.auth}/>
							</div>
						);
					})}
				</div>
				:
				<StyledActiveWindow>
					{
						Object.entries(this.props.posts).map(([key,value],index)=>{
							if(items.indexOf(key)!==-1){
								return (
										<LoadPost data={value} username={this.props.auth.user.name} subinfo={this.props.subinfo} key={index} ishome={false} auth={this.props.auth}/>
								);
							}
						})
					}
				</StyledActiveWindow>
			}
			</StyledMainWindow>
		);	
	}
}

const mapStateToProps=(state,props)=>{
	return {
		auth: state.authenticationReducer,
		subinfo: state.postReducer.data,
		posts: state.postReducer.posts,
		activeSub: state.subredditReducer.activeSubreddit,
		data: state.postReducer.data
	}
}

export default connect(mapStateToProps)(ContentBox);