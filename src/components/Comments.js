import React, { Component } from "react";
import {
	StyledComment,
	StyledCommentUps,
	StyledLinkBtn,
} from "../styles/components/commentStyles";

const Comments = (props) => (
	<div>
		{!props.count ? (
			<StyledLinkBtn onClick={props.loadComments}>
				view comments
			</StyledLinkBtn>
		) : (
			<div>
				{props.comments.slice(0, props.count).map((data, index) => {
					if (!data.hasOwnProperty("comment")) return;
					return (
						<StyledComment key={data.id}>
							<div>
								<b>{data.author}</b>&nbsp;
								<span>{data.comment}</span>
							</div>
							<div>
								{data.author === props.username && (
									<span
										className="opt"
										type="optcanvas"
										onClick={(e) =>
											props.toggleOpt(e, data.name, index)
										}
									>
										...
									</span>
								)}
								<StyledCommentUps>+{data.ups}</StyledCommentUps>
							</div>
						</StyledComment>
					);
				})}
				{props.count < props.comments.length ? (
					<StyledLinkBtn onClick={props.loadMore}>
						view more
					</StyledLinkBtn>
				) : (
					<StyledLinkBtn onClick={props.hideComments}>
						hide comments
					</StyledLinkBtn>
				)}
			</div>
		)}
	</div>
);

export default Comments;
