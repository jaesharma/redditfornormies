import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deselect_subreddit } from "../actions";
import { StyledBtnImg } from "../styles/components/headerStyles";
import { StyledMenubar } from "../styles/components/menubarStyles";

const Menubar = (props) => (
	<StyledMenubar>
		<NavLink to="/">
			<StyledBtnImg
				onClick={() => props.dispatch(deselect_subreddit())}
				type="home"
				src={
					props.nightmode
						? "/images/home-light.png"
						: "/images/home.png"
				}
				alt="home"
			/>
		</NavLink>
		<NavLink to="/explore">
			<StyledBtnImg
				type="compas"
				src={
					props.nightmode
						? "/images/compas-light.png"
						: "/images/compas.png"
				}
				alt="explore"
			/>
		</NavLink>
		<NavLink to="/notifications">
			<StyledBtnImg
				type="like"
				src={
					props.nightmode
						? "/images/like-light.png"
						: "/images/like.png"
				}
				alt="notifications"
			/>
		</NavLink>
		<NavLink to="/user">
			<StyledBtnImg src={props.icon_img} />
		</NavLink>
	</StyledMenubar>
);

const mapStateToProps = (state) => {
	return {
		icon_img: state.authenticationReducer.user.icon_img,
		nightmode: state.settingsReducer.nightmode,
	};
};

export default connect(mapStateToProps)(Menubar);
