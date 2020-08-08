import styled from 'styled-components';
import {popin,pop} from './animations';

export const StyledViewPostContent=styled.div`
	background: ${({theme})=>theme.bg};
	width: 35%;
	height: 90%;
	word-wrap: break-word;
	overflow: hidden;
	margin: 2rem 0 2rem 2rem;
	img{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
	}
	@media(max-width: ${({theme})=> theme.breakpoint}){
		margin: 0;
		padding: 0;
		height: 55%;
		width: 90%;
		border-radius: .3rem .3rem 0 0;
		transition: all 1s ease-in-out;
		animation: ${pop} .3s ease-in-out;
	}
`

export const StyledViewPostDetails=styled.div`
	display: flex;
	flex-direction: column;
	background: ${({theme})=>theme.bg};
	height: 90%;
	width: 30%;
	border-left: 1px ${({theme})=>theme.themeborder} solid;
	margin: 2rem 2rem 2rem 0;
	@media(max-width: ${({theme})=>theme.breakpoint}){
		display: none;
	}
`

export const StyledPostHead=styled.div`
	display: none;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: ${({theme})=> theme.name==="light" && theme.bg || theme.bodybg};
	color: ${({theme})=> theme.color}
	width: 100%;
	height: 3.7rem;
	border-radius: .3rem .3rem 0 0;
	border-bottom: 1px solid ${({theme})=> theme.themeborder};
	@media(max-width: ${({theme})=>theme.breakpoint}){
		display: flex;
	}
`

export const StyledCommentSection=styled.div`
	overflow-y: scroll;
	overflow-x: wrap;
	text-align: left;
	padding: 1rem;
	margin-bottom: 8rem;
	&::-webkit-scrollbar{
		width: 0px;
	}
`

export const StyledDetailSection=styled.div`
	min-height: 4rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 2rem;
	border: none;
	border-bottom: .6px ${({theme})=>theme.themeborder} solid;
	&>.details__username{
		text-decoration: none;
		font-weight: 600;
		color: ${({theme})=> theme.name==="light" && "black" || "white"};
	}
`

export const StyledDetailsFooter=styled.div`
	border: none;
	border-top: .6px ${({theme})=>theme.themeborder} solid;
	display: flex;
	flex-direction: column;
	background: ${({theme})=>theme.bg};
	position: fixed;
	bottom: 5%;
	align-items: flex-start;
	padding: 1rem;
	width: inherit;
	&>.footerbtns{
		display: flex;
		flex-direction: row;
	}
	&>b{
		margin: .6rem 0;
	}
`

export const StyledVPTextPost=styled.div`
	display: flex;
	background: ${({theme})=>theme.bg};
	height: 100%;
	padding: 2rem;
	text-align: left;
	flex-direction: column;
	overflow-wrap: break-word;
	overflow-y: scroll;
	text-align: justify;
	&::-webkit-scrollbar{
		width: 8px;
	}
`

export const StyledVPCloseBtn=styled.div`
	position: fixed;
	font-size: 3rem;
	color: white;
	cursor: pointer;
	right: 2%;
	top: -2%;
	transform: rotate(45deg);
`

export const StyledFollowBtn=styled.div`
	background: none;
	cursor: pointer;
	color: ${({theme})=>theme.colors.blue};
	margin-left: 1rem;
`