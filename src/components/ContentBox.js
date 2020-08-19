import React from "react";
import { connect } from "react-redux";
import LoadPost from "./LoadPost";
import debounce from "lodash.debounce";
import {
	StyledMainWindow,
	StyledActiveWindow,
} from "../styles/components/windowStyles.js";
import { StyledLoader } from "../styles/components/profileStyles";
import { StyledDiv } from "../styles/components/generalStyles";
import { getHomePage, fetchPosts } from "../actions/index";

const ContentBox = (props) => {
	const { activeSub, data } = props;
	const ishome = !!!props.activeSub;
	if (!ishome) {
		var items = data[activeSub].items;
	}
	window.onscroll = debounce(() => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.scrollHeight
		) {
			if (ishome) props.dispatch(getHomePage());
			else props.dispatch(fetchPosts());
		}
	}, 100);
	return (
		<StyledMainWindow>
			{ishome ? (
				<div>
					{Object.entries(props.homepage.fetchedPosts).map(
						([key, value], index) => {
							return (
								<div key={value.id}>
									<LoadPost
										data={value}
										username={props.auth.user.name}
										subinfo={props.subinfo}
										ishome={true}
										auth={props.auth}
									/>
								</div>
							);
						}
					)}
				</div>
			) : (
				<StyledActiveWindow>
					{Object.entries(props.posts).map(([key, value], index) => {
						if (items.indexOf(key) !== -1) {
							return (
								<LoadPost
									data={value}
									username={props.auth.user.name}
									subinfo={props.subinfo}
									key={index}
									ishome={false}
									auth={props.auth}
								/>
							);
						}
					})}
				</StyledActiveWindow>
			)}
			<StyledDiv>
				{props.homepage.loading && (
					<StyledLoader
						type="pageload"
						size="mid"
						src="/loaders/spinner.gif"
					/>
				)}
			</StyledDiv>
		</StyledMainWindow>
	);
};

const mapStateToProps = (state, props) => {
	return {
		auth: state.authenticationReducer,
		subinfo: state.postReducer.data,
		posts: state.postReducer.posts,
		activeSub: state.subredditReducer.activeSubreddit,
		data: state.postReducer.data,
		homepage: state.postReducer.homepage,
	};
};

export default connect(mapStateToProps)(ContentBox);
