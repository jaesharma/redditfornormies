import styled from 'styled-components';

export const StyledComment=styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	&>div>.opt{
		display: none;
		cursor: pointer;
	}
	&:hover{
		&>div>.opt{
			display: block;
		}
	}
	transition: all .2s ease;
`

export const StyledCommentUps=styled.b`
	float: right;
`

export const StyledLinkBtn=styled.p`
	color: gray;
	cursor: pointer;
`

export const StyledCommentBox=styled.div`
	display: flex;
	flex-direction: row;
	align-self: flex-start;
	margin-left: -1rem;
	width: 100%;
	scroll-behavior: smooth;
	transition: all .2s ease;
`

export const StyledCommentInput=styled.input`
	outline: none;
	width: 100%;
	height: 2rem;
	padding: .1rem .8rem;
	background: ${({theme})=> theme.name==="light" ? theme.colors.gray2 : theme.colors.gray4};
	border: none;
	&:placeholder{
		color: ${({theme})=> theme.colors.gray1}
	}
`

export const StyledPostButton=styled.button`
	border: none;
	outline: none;
	background: transparent;
	cursor: pointer;
	margin-right: -1rem;
	&:disabled{
		color: ${({theme})=> theme.colors.gray3};
	}
	&:enabled{
		color: ${({theme})=> theme.colors.blue}
	}
`