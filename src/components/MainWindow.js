import React,{Component} from 'react';
import {connect} from 'react-redux';
import ContentBox from './ContentBox';
import _ from 'lodash';

class MainWindow extends Component{
	render(){
		const {activeSub, posts, data}=this.props
		return(
			<div className="main-window">
				{this.props.activeSub && data[activeSub].items ? 
					<ContentBox 
					   ishome={false}
					   sub={activeSub} 
					   items={data[activeSub].items} 
					   posts={posts} 
					/> :
					<ContentBox
						ishome={true}
						posts={_.shuffle(this.props.posts)}
					/>
				 }
			</div>
		);
	}
}

const mapStateToProps=(state,props)=>{
	return {
		activeSub: state.subredditReducer.activeSubreddit,
		posts: state.postReducer.posts,
		data: state.postReducer.data
	}
}

export default connect(mapStateToProps)(MainWindow);