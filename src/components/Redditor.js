import React, { Component } from "react";
import { connect } from "react-redux";
import RenderSubs from "./RenderSubs";
import {
	StyledRedditor,
	StyledScrollBtn,
} from "../styles/components/redditorStyles";

class Redditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollpos: 0,
			scrollWidth: undefined,
		};
		this.redditor = React.createRef();
	}

	scrollLeft = () => {
		this.redditor.current.scrollLeft -= 500;
		this.setState({
			scrollpos: this.redditor.current.scrollLeft - 500,
			scrollWidth: this.redditor.current.scrollWidth,
		});
	};

	scrollRight = () => {
		this.redditor.current.scrollLeft += 500;
		this.setState({
			scrollpos: this.redditor.current.scrollLeft + 500,
			scrollWidth: this.redditor.current.scrollWidth,
		});
	};

	componentDidMount() {
		this.setState({ scrollWidth: this.redditor.current.scrollWidth });
	}

	render() {
		return (
			<div>
				{this.state.scrollpos > 50 && (
					<StyledScrollBtn position="left" onClick={this.scrollLeft}>
						<span>></span>
					</StyledScrollBtn>
				)}
				<StyledRedditor ref={this.redditor}>
					<RenderSubs
						focusTextInput={this.props.focusTextInput}
						subs={this.props.subreddits}
						activeSub={this.props.activeSub}
					/>
				</StyledRedditor>
				{this.state.scrollpos < this.state.scrollWidth - 450 && (
					<StyledScrollBtn
						position="right"
						onClick={this.scrollRight}
					>
						<span>></span>
					</StyledScrollBtn>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		subreddits: state.postReducer.data,
		activeSub: state.subredditReducer.activeSubreddit,
	};
};

export default connect(mapStateToProps)(Redditor);
