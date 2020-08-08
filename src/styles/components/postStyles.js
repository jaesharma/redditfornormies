import styled from 'styled-components';

export const StyledPostContainer=styled.div`
	display: flex;
	background: ${({theme})=> theme.bg};
	border: ${({theme})=>theme.border} 1px solid;
	border-radius: 3px;
	height: 100%;
	flex-direction: column;
	margin-bottom: 4rem;
	overflow-wrap: break-word;
	text-align: justify;
	width: 100.4%;
	@media(max-width: ${({theme})=> theme.breakpoint}){
		margin: 0;
		padding-bottom: 1.8rem;
		border: none;
	}
`

export const StyledPostTop=styled.div`
	border:none;
	border-bottom: 1px ${({theme})=>theme.themeborder} solid;
	font-weight: 600;
	height: 4rem;
	padding-top: .3rem;
	&>.pt__username{
		color: ${({theme})=>theme.color};
		display: flex;
		text-decoration: none;
		padding-top: 1rem;
	}
`
export const StyledPostMid=styled.div`
	&>.text-post{
		padding: 0 1.5rem;
	}
`

export const StyledPostBottom=styled.div`
	border: none;
	padding: 1rem;
`

export const StyledInlineButtons=styled.div`
	display: flex;
	flex-direction: row;
`