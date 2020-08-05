import styled from 'styled-components';

export const StyledSearchbar=styled.div`
	display: flex;
	flex-direction: row;
	float: left;
	width: 14rem;
	margin-left: 6rem;
	@media(max-width: ${({ theme }) => theme.breakpoint}){
		${props=>{
			if(props.ishome){
				return "display: none;";
			}else{
				return "width: 100%;margin: 0;"
			}
		}}
	}
`

export const StyledSearchInput=styled.input`
	background: ${({theme})=> theme.name==="light"? theme.colors.gray1: theme.colors.gray7};
	border: 1px ${({theme})=> theme.name==="light"? theme.colors.gray3: theme.colors.gray7} solid;
	border-radius: 3px;
	color: ${({theme})=> theme.name==="light"? "gray": "black"};
	font-size: 1rem;
	height: 2rem;
	outline: none;
	padding: 0 2rem;
	width: 100%;
	&::placeholder{
		color: ${({theme})=> theme.name==="light"? theme.colors.gray3: theme.colors.gray2};
		font-size: 1rem;
		text-align: center;
	}
	&:focus::placeholder{
		text-align: left;
	}
	&:focus+.icon{
		right: 12.5rem;
	}
	@media(max-width: ${({theme})=> theme.breakpoint}){
		margin: 0;
		padding: 0 .6rem;
	}
`

export const StyledSearchIcon=styled.span`
	align-self: center;
	font-size: .9rem;
	position: relative;
	color: ${({theme})=> theme.name==="light"? theme.colors.gray3: theme.colors.gray2};
	right: 9.1rem;
	${props=>{
		if(props.type==="fix"){
			return "right:89%;";
		}else if(props.type==="pseudo"){
			return "right: 67%;";
		}
	}}
	@media(max-width: ${({theme})=> theme.breakpoint}){
		display: none;
	}
`

export const StyledSearchResults=styled.div`
	display: flex;
	background: ${({theme})=>theme.bg};
	border-bottom: 1px  ${({theme})=> theme.colors.gray1} solid;
	border-radius: 2px;
	flex-direction: column;
	margin: 3.5rem 0 0 -2rem;
	min-height: 0;
	max-height: 24rem;
	overflow-y: scroll;
	overflow-x: hidden;
	position: absolute;
	width: 19rem;
	left: 40%;
	border: 1px ${({theme})=> theme.themeborder} solid;
	word-wrap: break-word;
	z-index: 6;
	@media(max-width: ${({theme})=> theme.breakpoint}){
		left: 0;
		margin: 0;
		margin-top: 2.2rem;
		width: 100vw;
	}
`

export const StyledClearBtn=styled.span`
	border: none;
	color: ${({theme})=> theme.name==="light" && theme.colors.gray4 || "black"};
	cursor: pointer;
	font-size: 1.5rem;
	right: 44%;
	margin-bottom: .3rem;
	position: absolute;
	transform: rotate(45deg);
	transition: all .4s ease;
	z-index: 6;	
	@media(max-width: ${({theme})=> theme.breakpoint}){
		top: 0;
		right: 2%;
	}
`

export const StyledAddBtn=styled.button`
	position: relative;
	background: none;
	border: none;
	border-radius: 50%;
	color: gray;
	margin-top: 3rem;
	cursor: pointer;
	outline: none;
	align-self: center;
	${props=>{
		switch(props.size){
			case "sm":
				return "height: 2px;";
			case "mid":
				return "font-size: 2.4rem;margin: 1rem .4rem 1.3rem 1.4rem;";
			case "big":
				return "font-size: 3.2rem;margin: 1rem .4rem 1.3rem 1.4rem;";
		}
	}}
	&:hover{
		color: #0095f6;
		transition: color .2s ease;
	}
	@media(max-width: ${({theme})=>theme.breakpoint}){
		display: none;
	}
`

export const StyledSearchedSub=styled.div`
	flex-direction: row;
	overflow-wrap: break-word;
	padding: .6rem;
	&>img{
		border: none;
		border-radius: 50%;
		float: left;
		height: 2.5rem;
		width: 2.5rem;
	}
	&>b{
		margin: 1rem;
	}
	&>p{
		margin: 0;
		margin-left: 3.3rem;
		padding: 0;
	}
`

export const StyledSearchedSubContainer=styled.div`
	display: flex;
	flex-direction: row;
	border: none;
	border-bottom: 1px ${({theme})=> theme.colors.gray2} solid;
	min-height: 4.8rem;
	align-self: center;
	overflow-y: hidden;
	width: 100%;
	justify-content: space-between;
	margin-left: .1rem;
	&:hover{
		background: ${({theme})=> theme.colors.gray1};
		cursor: pointer;
		transition: background .2s ease;
	}
`

export const StyledSearchedResultsArrow=styled.div`
	&::before{
	    position: absolute;
	    bottom: -14.5px;
	    left: 48%;
	    width: 0;
	    height: 0;
	    margin-top: -10px;
	    border-top: 15px solid transparent;
	    border-left: 15px solid transparent;
	    border-right: 15px solid transparent;
	    border-bottom: 15px solid ${({theme})=> theme.bg};
	    content: '';
	    z-index: 7;
	}
`