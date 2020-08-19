import React from "react";

import {
	StyledCanvas,
	StyledTab,
	StyledTabEntry,
} from "../styles/components/tabStyles";

class OptTab extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<StyledCanvas
				type="optcanvas"
				onClick={(e) => this.props.toggleOpt(e)}
			>
				<StyledTab type="opt" height="8rem">
					<StyledTabEntry onClick={() => this.props.editComment()}>
						Edit
					</StyledTabEntry>
					<StyledTabEntry
						color="red"
						type="optcanvas"
						onClick={() => this.props.del_comment()}
					>
						Delete
					</StyledTabEntry>
				</StyledTab>
			</StyledCanvas>
		);
	}
}

export default OptTab;
