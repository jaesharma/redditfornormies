import React,{Component} from 'react';
import {connect} from 'react-redux';
import RenderSubs from './RenderSubs';

class Redditor extends Component{
	constructor(props){
		super(props);
		this.state={
			scrollpos:0,
			offsetWidth: 675
		}
		this.redditor=React.createRef()
	}

	scrollLeft=()=>{
		this.redditor.current.scrollLeft-=500
		this.setState({scrollpos: this.redditor.current.scrollLeft-500,offsetWidth: this.redditor.current.offsetWidth})
	}

	scrollRight=()=>{
		this.redditor.current.scrollLeft+=500
		this.setState({scrollpos: this.redditor.current.scrollLeft+500,offsetWidth: this.redditor.current.offsetWidth})
	}
	render(){
		return(
			<div>
				{this.state.scrollpos>50 && 
					<div className="scroll-btn btn-left" 
						onClick={this.scrollLeft}>
							<span>></span>
					</div>
				}
				<div className="redditor" ref={this.redditor} >
					<RenderSubs 
						focusTextInput={this.props.focusTextInput} 
						subs={this.props.subreddits}
						activeSub={this.props.activeSub}
					/>
				</div>
				{this.state.scrollpos<this.state.offsetWidth && 
					<div 
					className="scroll-btn btn-right" 
					onClick={this.scrollRight}>
						<span>></span>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps=(state,props)=>{
	return {
		subreddits: state.postReducer.data,
		activeSub: state.subredditReducer.activeSubreddit
	}
}

export default connect(mapStateToProps)(Redditor)