import React,{Component} from 'react';
import {connect} from 'react-redux';
import LoadPost from './LoadPost';
import _ from 'lodash';

class HomeWindow extends Component{
	render(){
		return (
				<div>
					{Object.entries(_.shuffle(this.props.posts)).map(([key,value],index)=>{
						return (
							<div key={value.id}>
								<LoadPost data={value} ishome={true}/>
							</div>
						);
					})}
				</div>
		);
	}
}

const mapStateToProps=(state,props)=>{
	return {
		posts: state.postReducer.posts
	}
}

export default connect(mapStateToProps)(HomeWindow);