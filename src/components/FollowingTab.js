import React from "react";
import { NavLink } from "react-router-dom";
import { removeSubreddit } from "../actions";
import {
	StyledFollowingTab,
	StyledFTab,
	StyledFTabHeader,
	StyledFTabText,
	StyledFTabCloseBtn,
	StyledFollowings,
	StyledFollowing,
	StyledUnfollowBtn,
} from "../styles/components/followingtabStyles";

const Followings = ({ followings, closeTab, dispatch }) => {
	return (
		<StyledFollowingTab>
			<StyledFTab>
				<StyledFTabHeader>
					<StyledFTabText>Following</StyledFTabText>
					<StyledFTabCloseBtn
						onClick={() => closeTab("followingTab")}
					>
						+
					</StyledFTabCloseBtn>
				</StyledFTabHeader>
				<StyledFollowings>
					{Object.entries(followings).map(
						([subname, details], index) => {
							return (
								<StyledFollowing key={index}>
									<NavLink
										to={`r/${subname}`}
										className="following_details"
									>
										<img src={details.icon} />
										{subname.length > 12 ? (
											<p>{subname.substring(0, 12)}...</p>
										) : (
											<p>{subname}</p>
										)}
									</NavLink>
									<div>
										{
											<StyledUnfollowBtn
												onClick={() =>
													dispatch(
														removeSubreddit(subname)
													)
												}
											>
												Unfollow
											</StyledUnfollowBtn>
										}
									</div>
								</StyledFollowing>
							);
						}
					)}
				</StyledFollowings>
			</StyledFTab>
		</StyledFollowingTab>
	);
};

export default Followings;
