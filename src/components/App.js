import React from 'react';
import {ThemeProvider} from 'styled-components';
import AppRouter from '../router/AppRouter';
import {connect} from 'react-redux';
import GlobalStyles from '../styles/base/base';
import {colors} from '../styles/base/colors';

const lighttheme={
	name: "light",
	bodybg: colors.gray1,
	border: colors.gray2,
	themeborder: colors.gray2,
	bg: "white",
	color: "black",
	breakpoint: "42rem",
	colors: colors
}

const darktheme={
	name: "dark",
	bodybg: "#121212",
	border: "#363537",
	themeborder: "#000",
	bg: "#363537",
	color: colors.gray4,
	breakpoint: "42rem",
	colors: colors
}

class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<ThemeProvider theme={this.props.nightmode? darktheme: lighttheme}>
				<GlobalStyles/>
				<AppRouter/>
			</ThemeProvider>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		nightmode: state.settingsReducer.nightmode
	}
}

export default connect(mapStateToProps)(App);