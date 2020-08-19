import styled from "styled-components";
import { popin } from "./animations";

export const StyledFollowingTab = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	background-size: cover;
	backdrop-filter: blur(2px);
	display: flex;
	justify-content: center;
	position: fixed;
	z-index: 22;
	transition: all 1s ease-in-out;
`;

export const StyledFTab = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4rem;
	background: ${({ theme }) => theme.bg};
	height: 26rem;
	width: 20rem;
	border: none;
	border-radius: 1rem;
	box-shadow: 5px 10px 2rem
		${({ theme }) => (theme.name === "light" ? "gray" : "black")};
	position: fixed;
	top: 8%;
	z-index: 12;
	transition: all 1s ease-in-out;
	animation: ${popin} 0.1s;
`;

export const StyledFTabHeader = styled.div`
	display: flex;
	flex-direction: row;
	border-radius: 1rem 1rem 0 0;
	border-bottom: 1px ${({ theme }) => theme.colors.gray2} solid;
	text-align: center;
	height: 3rem;
`;

export const StyledFTabText = styled.p`
	width: 90%;
	padding-left: 2rem;
`;

export const StyledFTabCloseBtn = styled.p`
	transform: rotate(45deg);
	font-size: 2rem;
	cursor: pointer;
	width: 3rem;
	height: 3rem;
	margin: 0;
	outline: none;
	border: none;
`;

export const StyledFollowings = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	height: 100%;
	padding: 1rem;
`;

export const StyledFollowing = styled.div`
	display: flex;
	flex-direction: row;
	& > .following_details {
		cursor: pointer;
		display: flex;
		width: 100%;
		height: 3rem;
		padding: 1px 0;
		img {
			width: 2rem;
			height: 2rem;
			border: none;
			border-radius: 50%;
			align-self: center;
		}
		,
		p {
			padding-left: 1rem;
			text-decoration: none;
			color: ${({ theme }) => theme.color};
			text-overflow: ellipsis;
		}
	}
`;

export const StyledUnfollowBtn = styled.button`
	background: ${({ theme }) => theme.colors.gray7};
	color: white;
	border: none;
	outline: none;
	border-radius: 6px;
	width: 4rem;
	height: 2rem;
	cursor: pointer;
	margin-top: 0.5rem;
`;
