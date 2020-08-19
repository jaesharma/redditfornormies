import styled from "styled-components";

export const StyledMenubar = styled.div`
	display: none;
	bottom: 0%;
	width: 100%;
	position: fixed;
	background: ${({ theme }) => theme.bg};
	justify-content: space-around;
	height: 2.8rem;
	align-items: center;
	border: none;
	border-top: 1px ${({ theme }) => theme.themeborder} solid;
	z-index: 6;
	@media (max-width: ${({ theme }) => theme.breakpoint}) {
		display: flex;
	}
`;
