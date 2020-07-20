import React,{Component} from 'react';
import {connect} from 'react-redux';
import HomeWindow from './HomeWindow';
import ActiveWindow from './ActiveWindow';

class MainWindow extends Component{
	render(){
		const {activeSub, posts, data}=this.props
		return(
			<div className="main-window">
				{this.props.activeSub && data[activeSub].items ? 
					<ActiveWindow 
					   sub={activeSub} 
					   items={data[activeSub].items} 
					   posts={posts} 
					/> :
					<HomeWindow/>
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