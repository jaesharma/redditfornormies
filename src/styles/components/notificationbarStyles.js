import styled from "styled-components";

export const StyledNotificationBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	background: ${({ theme }) =>
		(theme.name === "light" && "white") || theme.bg};
	top: 4rem;
	border-radius: 6px;
	right: 12%;
	width: 40%;
	min-height: 6rem;
	max-height: 20rem;
	overflow-x: hidden;
	overflow-y: scroll;
	z-index: 3;
	${(props) => {
		if (props.theme.name === "light") {
			return "box-shadow: 4px 4px 1rem gray;border: 1px ${({theme})=>theme.color} solid;";
		} else if (props.theme.name === "dark") {
			return "border: 1px ${({theme})=>theme.colors.gray7} solid;";
		}
	}}
`;

export const StyledNotification = styled.div`
	width: 100%;
	min-height: 5.4rem;
	background: ${({ theme }) => theme.bg};
	border-bottom: 1px solid ${({ theme }) => theme.themeborder};
	padding: 0 1rem;
	overflow: hidden;
	cursor: pointer;
	display: flex;
	flex-direction: column;
`;

export const StyledNFooter = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 12px;
	align-items: flex-end;
	justify-content: space-between;
	& > div {
		display: flex;
		flex-direction: row;
		margin-bottom: 0.8rem;
	}
`;
export const StyledNotificationBar = styled.div`
	&::before {
		position: fixed;
		right: 17.8%;
		top: 2.85rem;
		width: 0;
		height: 0;
		margin-top: -10px;
		border-top: 15px solid transparent;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 15px solid
			${({ theme }) => (theme.name === "light" && "white") || theme.bg};
		z-index: 99;
		content: "";
	}
	&::after {
		position: fixed;
		top: 2.85rem;
		right: 17.8%;
		width: 0;
		height: 0;
		filter: blur(2px);
		margin-top: -12px;
		border-top: 15px solid transparent;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 13px solid
			${({ theme }) =>
				(theme.name === "light" && theme.colors.gray3) || theme.bodybg};
		z-index: 98;
		content: "";
	}
`;
