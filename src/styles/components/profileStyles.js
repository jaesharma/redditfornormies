import styled from 'styled-components';
import {FadeInRight} from './animations';


export const StyledProfile=styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	position: absolute;
	margin: 0 20%;
	@media(max-width: ${({theme})=>theme.breakpoint}){
		margin: 0;
		width: 100vw;
		overflow: hidden;
	}
	animation: ${FadeInRight} .3s ease;
`

export const StyledProfileInfo=styled.div`
	display: inherit;
	flex-direction: row;
	border-bottom: 1px ${({theme})=>theme.colors.gray3} solid;
	padding: 6rem 0;
	float: left;
	@media(max-width: ${({theme})=>theme.breakpoint}){
		overflow-wrap: break-word;
		padding-top: 3rem;
	}
`

export const StyledProfileName=styled.p`
	margin: 0;
	margin-right: 1rem;
	font-size: 1.8rem;
	font-weight: 80;
`

export const StyledProfileDetails=styled.div`
	display: inherit;
	flex-direction: column;
	position: relative;
	top: 1rem;
	@media(max-width: ${({theme})=>theme.breakpoint}){
		left: 1rem;
		width: 70%;
	}
	&>.userdetails{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		overflow-wrap: break-word;
		@media(max-width: ${({theme})=> theme.breakpoint}){
			flex-direction: column;
		}
	}
	&>.subbtn{
		display: flex;
		flex-direction: row;
		@media(max-width: ${({theme})=> theme.breakpoint}){
			margin: 0;
			flex-direction: column;
		}
	}
	&>p{
		width: 90%;
		text-align: justify;
		overflow-wrap: break-word;
	}
`

export const StyledButtonGroup=styled.div`
	display: flex;
	flex-direction: row;
`

export const StyledProfilePosts=styled.div`
	display: flex;
	justify-content: center;
	margin-top: 1rem;
`

export const StyledProfileIcon=styled.img`
		border: none;
		border-radius: 50%;
		width: 9rem;
		height: 9em;
		padding: 1rem;
		@media(max-width: ${({theme})=> theme.breakpoint}){
			padding: 0;
			width: 5rem;
			height: 5rem;
			margin-top: 1.2rem;
	}
`

export const StyledProfileGallery=styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
`

export const StyledButton=styled.div`
	display: flex;
	align-self: center;
	justify-content: center;
	padding-top: .2rem;
	position: relative;
	width: 5rem;
	height: 2rem;
	border: none;
	outline: none;
	border-radius: 4px;
	font-weight: 550;
	cursor: pointer;
	${props=>{
		switch(props.type){
			case "primary":
				return "background: #0075f6;color: white;";
			case "secondary":
				return "background: gray; color: white;";
		}
	}}
	@media(max-width: ${({theme})=> theme.breakpoint}){
		width: 8rem;
		align-self: flex-start;
		margin: .2rem 0;
	}
`

export const StyledLoader=styled.img`
	position: fixed;
	width: 3rem;
	display: flex;
	align-self: center;
	${props=>{
		switch(props.size){
			case "sm":
				return "width:1rem;height:1rem;";
			case "mid":
				return "height: 3rem;margin-bottom: 3rem;"
		}
	}}
	${props=>{
		switch(props.type){
			case "input":
				return `
					top: 1.1rem;
					height: 1rem;
					right: 44%;
					position: absolute;
					width: 1rem;
					z-index: 6;
					@media(max-width: ${props.theme.breakpoint}){
						top: 1%;
						right: 2%;
					}`
			case "pageload":
				return `
					bottom: 0%;
					right: 48%;
					@media(max-width: ${props.theme.breakpoint}){
						right: 28%;
					}`
			default:
				return 'position: default;margin: 1rem;'
		}
	}}
`

export const StyledLoginBoard=styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
	padding-top: 4rem;
	&>span{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: center;
		transition: all .1s ease;
	}
	transition: all .1s ease;
`

export const StyledInfoBlock=styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

export const StyledInlineDiv=styled.div`
	display: flex;
	align-items: center;
	&>span{
		font-weight: bold;
		margin-right: 2rem;
	}
`