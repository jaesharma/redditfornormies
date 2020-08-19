import React from "react";
import { getTrophies } from "../actions/api-calls";
import {
	StyledCanvas,
	StyledTab,
	StyledTabHead,
	StyledTabValues,
	StyledTabBody,
} from "../styles/components/tabStyles";
import { StyledBtnImg } from "../styles/components/headerStyles";

class Trophies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trophies: {},
		};
	}
	handleCloseTab = (e) => {
		if (e.target.getAttribute("type") === "canvas") {
			this.props.closeTab("trophies");
		}
	};
	async componentDidMount() {
		this.setState({ trophies: await getTrophies(this.props.token) });
	}
	render() {
		return (
			<StyledCanvas type="canvas" onClick={(e) => this.handleCloseTab(e)}>
				<StyledTab>
					<StyledTabHead>Trophies</StyledTabHead>
					<StyledTabBody>
						{Object.entries(this.state.trophies).map(
							([key, value], index) => {
								return (
									<StyledTabValues key={index}>
										<StyledBtnImg src={value.icon} />
										<p>{value.name}</p>
									</StyledTabValues>
								);
							}
						)}
					</StyledTabBody>
				</StyledTab>
			</StyledCanvas>
		);
	}
}

export default Trophies;
