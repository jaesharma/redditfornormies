import styled from "styled-components";

export const StyledScrollBtn = styled.div`
	background: ${({ theme }) => theme.bg};
	border: none;
	border-radius: 50%;
	box-shadow: 1px 2px 5px ${({ theme }) =>
		theme.name === "light" ? "gray" : "black"};
	cursor: pointer;
	font-size: 1rem;
	height: 1.7rem;
	opacity: .9;
	padding-top: .1rem;
	position: absolute;
	text-align: center;
	top: 9rem;
	width: 1.7rem;
	${(props) => {
		if (props.position === "left") {
			return "left: 13.6%;transform: rotate(175deg);";
		} else if (props.position === "right") {
			return "left: 59%;";
		}
	}}
	@media(max-width: ${({ theme }) => theme.breakpoint}){
		top: 4.4rem;
		${(props) => {
			if (props.position === "left") {
				return "left: 2%;";
			} else if (props.position === "right") {
				return "left: 90%;";
			}
		}}
	}
`;

export const StyledRedditor = styled.div`
	background: ${({ theme }) => theme.bg};
	border: 1px ${({ theme }) => theme.border} solid;
	border-radius: 2px;
	display: flex;
	flex-direction: row;
	height: 8rem;
	justify-content: flex-start;
	margin-top: 4rem;
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-behavior: smooth;
	width: 100%;
	&::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		background: none;
		border: none;
		border: 1px ${({ theme }) => theme.border} solid;
		height: 7.5rem;
		margin: 0;
		overflow-y: hidden;
	}
`;

export const StyledSubContainer = styled.div`
	align-self: center;
	display: flex;
	flex-direction: row;
`;

export const StyledSub = styled.div`
	margin: 2rem 0.6rem;
	align-self: center;
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		padding-top: 1rem;
	}
	& > .sub__name {
		color: ${({ theme }) => theme.colors.gray7};
		font-size: 0.9rem;
		text-align: center;
		margin: 0;
	}
	& > .sub__name-active {
		color: red;
	}
`;

export const StyledSubIcon = styled.img`
	border: 2px ${({ theme }) => theme.colors.red} solid;
	border-radius: 50%;
	cursor: pointer;
	height: 4.1rem;
	align-self: center;
	margin: 0 0.2rem;
	outline: none;
	padding: 0.2rem;
	width: 4.2rem;
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		height: 3.7rem;
		width: 3.8rem;
	}
`;
