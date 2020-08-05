import styled from 'styled-components';
import {FadeInLeft} from './animations';

export const StyledMainWindow=styled.div`
	background: none;
	margin: 1.8rem 0;
	@media(max-width: ${({theme})=> theme.breakpoint}){
		margin: 0;
	}
	transition: all .4s ease-in-out;
`

export const StyledActiveWindow=styled.div`
	background: none;
	animation: ${FadeInLeft} .3s;
	transition: all .4s ease-in-out;
`

export const StyledWindowContainer=styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	height: 100vh;
	animation: ${FadeInLeft} .3s;
	transition: all .4s ease-in-out;
`

export const StyledContentBox=styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin-top: 2rem;
	@media(max-width: ${({theme})=> theme.breakpoint}){
		margin: 2rem 0;
		width: 100%;
	}
	&::-webkit-scrollbar {
    	width: 2px;
    }
	transition: all .4s ease-in-out;
`

export const StyledInfoBox=styled.div`
	align-self: top;
	background: none;
	@media(max-width: ${({theme})=> theme.breakpoint}){
		display: none;
	}
	transition: all .4s ease-in-out;
`