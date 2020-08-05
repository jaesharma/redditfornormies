import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import LoadPost from './LoadPost';
import {StyledActiveWindow} from '../styles/components/windowStyles.js'

class ContentBox extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
			{
				this.props.ishome ? 
				<div>
					{Object.entries(_.shuffle(this.props.posts)).map(([key,value],index)=>{
						return (
							<div key={value.id}>
								<LoadPost data={value} username={this.props.auth.user.name} subinfo={this.props.subinfo} ishome={this.props.ishome} auth={this.props.auth}/>
							</div>
						);
					})}
				</div>
				:
				<StyledActiveWindow>
					{
						Object.entries(this.props.posts).map(([key,value],index)=>{
							if(this.props.items.indexOf(key)!==-1){
								return (
										<LoadPost data={value} username={this.props.auth.user.name} subinfo={this.props.subinfo} key={index} ishome={this.props.ishome} auth={this.props.auth}/>
								);
							}
						})
					}
				</StyledActiveWindow>
			}
			</div>
		);	
	}
}

const mapStateToProps=(state,props)=>{
	return {
		auth: state.authenticationReducer,
		subinfo: state.postReducer.data,
		posts: state.postReducer.posts,
	}
}

export default connect(mapStateToProps)(ContentBox);