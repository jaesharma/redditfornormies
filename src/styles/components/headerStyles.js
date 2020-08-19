import styled from "styled-components";

export const StyledHeader = styled.div`
	background: ${(props) => props.theme.bg};
	border: 2px ${({ theme }) => theme.border} solid;
	display: flex;
	flex-direction: row;
	height: 3.5rem;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
	@media (max-width: ${(props) => props.theme.breakpoint}) {
		height: 2.5rem;
		border: none;
	}
	& > .header-text {
		font-family: "Grand Hotel", cursive;
		font-size: 2.2rem;
		font-weight: 550;
		color: ${({ theme }) => theme.color};
		text-decoration: none;
		margin-left: 12%;
		@media (max-width: ${(props) => props.theme.breakpoint}) {
			margin: 0;
			margin-left: 38%;
			font-size: 1.6rem;
		}
	}
`;

export const StyledHeaderBtns = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	height: 2rem;
	padding-right: 14%;
	@media (max-width: ${(props) => props.theme.breakpoint}) {
		display: none;
	}
`;

export const StyledBtnImg = styled.img`
	border: none;
	border-radius: 50%;
	cursor: pointer;
	height: 1.6rem;
	width: 1.6rem;
	margin: 0 .6rem;
	transition: all .1s ease;
	${(props) => {
		switch (props.type) {
			case "inbox":
				return "transform: scale(1.2);margin: 0 .4rem;";
			case "compas":
				return "height: 1.5rem;";
			case "like":
				return "height: 1.55rem;";
			case "upvote":
				return "margin: 0;padding: 0;height: 1.4rem;";
			case "downvote":
				return "margin: 0;padding: 0;height: 1.4rem;transform: rotate(180deg);";
			case "headerInbox":
				return "display: none;position: fixed;transform: rotate(15deg);width: 2rem;height: 2rem;z-index: 11;right:1%;";
			case "arrow":
				return "display: none;position: absolute;left: 0;top: 2%;transform: scale(1);";
			case "comment":
				return "width: 1rem;height: 1rem;";
		}
	}}
	@media(max-width: ${({ theme }) => theme.breakpoint}){
		display: block;
	}
`;
