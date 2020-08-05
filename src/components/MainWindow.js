import React,{Component} from 'react';
import {connect} from 'react-redux';
import ContentBox from './ContentBox';
import {StyledMainWindow} from '../styles/components/windowStyles';
import _ from 'lodash';

class MainWindow extends Component{
	render(){
		const {activeSub, posts, data}=this.props
		return(
			<StyledMainWindow>
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
			</StyledMainWindow>
		);
	}
}

const mapStateToProps=(state,props)=>{
	return {
		activeSub: state.subredditReducer.activeSubreddit,
		data: state.postReducer.data
	}
}

export default connect(mapStateToProps)(MainWindow);