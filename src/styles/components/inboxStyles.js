import styled, { keyframes } from "styled-components";
import { FadeInRight } from "./animations";

export const StyledDM = styled.div`
	display: flex;
	flex-direction: row;
	position: fixed;
	top: 12%;
	justify-content: center;
	margin: 0 15%;
	background: ${({ theme }) => theme.bg};
	overflow: hidden;
	width: 70%;
	height: 85%;
	border: 1px solid ${({ theme }) => theme.themeborder};
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		positon: default;
		border: none;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		top: 0%;
		z-index: 12;
	}
	transition: all 0.1s ease;
	animation: ${FadeInRight} 0.3s ease-in-out;
`;

export const StyledDMUsers = styled.div`
	width: 50%;
	float: left;
	border: none;
	border-right: 1px solid ${({ theme }) => theme.themeborder};
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		width: 100%;
	}
`;

export const StyledDMHead = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.themeborder};
	& > p {
		color: ${({ theme }) => theme.color};
		font-weight: 700;
		font-size: 1rem;
	}
`;

export const StyledDMUserThread = styled.div`
	height: 90%;
	padding: 0.4rem;
	overflow-y: scroll;
`;

export const StyledMessages = styled.div`
	width: 100%;
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		display: none;
	}
`;

export const StyledChatHome = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	& > img {
		width: 6rem;
		height: 6rem;
		border: 2px solid black;
		border-radius: 50%;
		padding: 0.8rem 1rem 0.4rem 0.4rem;
		top: 39%;
		margin-bottom: 1rem;
	}
	& > h2 {
		font-weight: 200;
		margin: 0.6rem;
	}
	> p {
		font-size: 0.9rem;
		color: ${({ theme }) => theme.colors.gray4};
		margin: 0;
	}
`;

export const StyledUser = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0.5rem;
	cursor: pointer;
	& > img {
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
	}
`;
