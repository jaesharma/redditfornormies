import { createGlobalStyle } from 'styled-components';

const GlobalStyles=createGlobalStyle`
	*{
		box-sizing: border-box;
	}

	body {
	  color: ${props=> props.theme.color};
	  background: ${props=>props.theme.bodybg};
	  margin: 0;
	  font-family: 'Nunito Sans', sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	a{
		color: ${({theme})=>theme.colors.gray5};
		cursor: pointer;
	}
	a:visited{
		color: #06205c;
	}
	iframe{
		border: none;
		margin: 0;
		padding: 0;
	}
`

export default GlobalStyles;