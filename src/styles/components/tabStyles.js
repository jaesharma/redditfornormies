import styled from "styled-components";
import { fadein, popin } from "./animations";

export const StyledCanvas = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	background: rgba(0, 0, 0, 0.4);
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 11;
	transition: all 0.1s ease-in-out;
	animation: ${fadein} 0.1s;
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		height: 100%;
		width: 100%;
	}
`;

export const StyledTab = styled.div`
	background: ${({ theme }) => theme.bg};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 16rem;
	max-width: 16rem;
	min-height: ${(props) => (props.height && props.height) || "22rem"};
	max-height: 22rem;
	padding: 1rem;
	border: none;
	border-radius: 6px;
	z-index: 12;
	animation: ${popin} 0.3s;
	${(props) => {
		switch (props.type) {
			case "opt":
				return "justify-content: center;align-items: center;";
		}
	}}
`;

export const StyledTabHead = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-self: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};
	font-weight: 600;
	padding: 0.1rem 0;
`;

export const StyledTabValues = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
	min-width: 100%;
	max-height: 3rem;
	flex-basis: 100%;
	text-align: center;
	text-overflow: elipsis;
	overflow-wrap: wrap;
	animation: ${fadein} 0.1s;
`;

export const StyledTabBody = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100%;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
`;

export const StyledTabEntry = styled.p`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: ${(props) => (props.color && props.color) || props.theme.color};
`;
