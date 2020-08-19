import styled from "styled-components";
import { FadeInLeft } from "./animations";

export const StyledPageCanvas = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme.color}
	overflow-x: hidden;
	background: ${({ theme }) => theme.bodybg}
	transition: all .3s ease-in-out;
	animation: ${FadeInLeft} .3s ease-in-out;
`;

export const StyledPageHeading = styled.div`
	display: flex;
	flex-direction: row;
	position: fixed;
	width: 100%;
	z-index: 11;
	background: ${({ theme }) => theme.bg};
	justify-content: flex-start;
	align-items: center;
	padding-left: 1rem;
	height: 4rem;
	border: none;
	border-bottom: 1px ${({ theme }) => theme.themeborder} solid;
`;

export const Styledbody = styled.div`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.bg};
	color: ${({ theme }) => theme.color}
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	height: 100%;
`;
