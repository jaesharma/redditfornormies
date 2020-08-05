import styled from 'styled-components';

export const StyledUserInfoContainer=styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	left: 65%;
	margin-top: 7rem;
	position: fixed;
	width: 30%;
`

export const StyledUserInfo=styled.div`
	float: left;
	margin-bottom: 1rem;
`

export const StyledUserInfoText=styled.div`
	float: left;
	margin-left: 1rem;
	margin-top: .4rem;
	&>.name{
		color: #888;
		font-size: .8rem;
		margin: 0;
		margin-top: .2rem;
	}
	&>.username{
		color: ${({theme})=>theme.color};
		font-weight: 600;
		text-decoration: none;
	}
`

export const StyledUserName=styled.p`
	color: ${({theme})=>theme.color}
	text-decoration: none;
	margin: 0;
	font-size: .9rem;
	font-weight: 600;
`

export const StyledUserAvatar=styled.img`
	border: none;
	border-radius: 50%;
	float: left;
	height: 3.4rem;
	width: 3.4rem;
`

export const StyledSuggestions=styled.div`
	width: 22rem;
	display: flex;
	flex-direction: column;
	height: 22rem;
	margin-bottom: 1rem;
	&>b{
		color: $gray6;
		font-size: 1rem;
		font-weight: 500;
		margin: .4rem 0 .6rem .5rem;
	}
`

export const StyledSuggestion=styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: .6rem;
	align-items: center;
	&>div{
		height: 3rem;
		margin: 0;
		margin-left: 1rem;
		padding: 0;
	}
	&> img{
		border: none;
		border-radius: 50%;
		float: left;
		height: 2.8rem;
		width: 2.8rem;
	}
	&> button{
		font-size: 2.5rem;
		display: flex;
		right: 10%;
		margin-bottom: 4rem;
		position: absolute;
	}
`

export const StyledSuggestionText=styled.div`
	width: 2rem;
	position: absolute;
	left: 4rem;
	&> p{
		font-size: 1rem;
		font-weight: 400;
		margin: 0;
	}
	&> .suggestionTextTitle{
		color: ${({theme})=>theme.color};
		text-decoration: none;
		font-weight: 600;
	}
`

export const StyledUserInfoFooter=styled.div`
	color: #aaa;
	font-size: .6rem;
	margin-top: 1rem;
	text-decoration: none;
	&>.footertext{
		color: inherit;
		font-size: .8rem;
		margin: 1rem .8rem 1rem 0;
		text-decoration: none;
	}
`