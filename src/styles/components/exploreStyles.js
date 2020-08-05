import styled from 'styled-components';
import {popin,FadeInRight} from './animations';

export const StyledExplorer=styled.div`
	display: flex;
	flex-flow: row wrap;
	float: left;
	justify-content: flex-start;
	margin: 5rem 8rem;
	width: 80%;
	@media(max-width: ${({theme})=>theme.breakpoint}){
		width: 100%;
		margin: 0;
	}
	transition: all .1s ease-in-out;
	animation: ${FadeInRight} .1s ease;
`

export const StyledExplorePost=styled.div`
	background-color: white;
	border: 1px solid ${({theme})=>theme.border};
	display: flex;
	flex-direction: column;
	flex-grow: 4;
	flex-shrink: 1;
	height: 18rem;
	min-height: 15rem;
	margin: .5rem;
	max-width: 15.8rem;
	min-width: 15.8rem;
	overflow: hidden;
	position: relative;
	cursor: pointer;
	@media(max-width: ${({theme})=>theme.breakpoint}){
		width: 8.6rem;
		min-width: 8.6rem;
		min-height: 8rem;
		height: 12rem;
		margin: .1rem;
	}
	animation: ${popin} 1s ease-in-out;
`

export const StyledExplorePostImg=styled.img`
	background-size: cover;
	background: transparent url('https://static.wixstatic.com/media/d63215_a6ccc92841c74c6d835a02dac366b158~mv2.gif') center no-repeat;
	height: 100%;
	width: 100%;
	&:hover{
		filter: brightness(70%);
		transition: filter .1s ease-in-out;
	}
`

export const StyledExploreTextPost=styled.div`
	height: 100%;
	padding: 1rem;
	text-align: left;
	background: ${({theme})=> theme.bg};
	color: ${({theme})=> theme.color};
	word-wrap: break-word;
	&:hover{
		background: ${({theme})=> theme.name==="light" && "rgba(0,0,0,.2)" || "rgba(54, 53, 55,.9)"};
		height: 100%;
		transition: background .1s ease-in-out;
	}
`

export const StyledHoverDisplay=styled.h2`
	align-self: center;
	color: white;
	text-shadow: 1px ${({theme})=>theme.colors.gray2};
	top: 40%;
	position: absolute;
	z-index: 5;
`

export const StyledUpvoteIcon=styled.img`
	height: 1.5rem;
	width: 1.2rem;
	z-index: 7;
`