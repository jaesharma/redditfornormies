import styled from "styled-components";

export const StyledPageCover = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	& > h1 {
		margin: 0;
	}
	& > h2 {
		color: gray;
	}
`;

export const StyledImg = styled.img`
	width: 25rem;
	height: 25rem;
`;
