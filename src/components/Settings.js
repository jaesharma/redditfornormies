import React from "react";
import { connect } from "react-redux";
import { nightMode } from "../actions";
import {
	StyledSwitch,
	StyledLabelText,
} from "../styles/components/settingStyles";
import { StyledCanvas, StyledTab } from "../styles/components/tabStyles";

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: true,
		};
	}
	handleCloseSettings = (e) => {
		if (e.target.getAttribute("type") === "canvas") {
			this.props.closeTab("settings");
		}
	};
	render() {
		return (
			<StyledCanvas
				type="canvas"
				onClick={(e) => this.handleCloseSettings(e)}
			>
				<StyledTab>
					<div>
						<StyledSwitch>
							<input
								type="checkbox"
								defaultChecked={this.props.nightmode}
								onClick={() => this.props.dispatch(nightMode())}
							/>
							<span className="slider round"></span>
						</StyledSwitch>
						<StyledLabelText>Night Mode</StyledLabelText>
					</div>
				</StyledTab>
			</StyledCanvas>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nightmode: state.settingsReducer.nightmode,
	};
};

export default connect(mapStateToProps)(Settings);
