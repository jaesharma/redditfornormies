import React,{Component} from 'react';
import Redditor from './Redditor';
import Header from './Header';
import ContentBox from './ContentBox';
import Menubar from './Menubar';
import User from './User';
import {StyledWindowContainer, StyledContentBox, StyledInfoBox} from '../styles/components/windowStyles';

class Dashboard extends Component{
	constructor(props){
	super(props)
	this.textInputRef=React.createRef();
	this.focusTextInput=this.focusTextInput.bind(this);
	}

	focusTextInput=()=>{
		this.textInputRef.current.focus();
	}
	render(){
		return(
			<div style={{width: "99.7%"}}>
				<Header 
					ishome={true}
					dashboard={true}
					textInputRef={this.textInputRef} 
					focusTextInput={this.focusTextInput} />
				<StyledWindowContainer>
					<StyledContentBox>
					  <Redditor focusTextInput={this.focusTextInput}/>
					  <ContentBox/>
					</StyledContentBox>
					<StyledInfoBox>
						<User/>
					</StyledInfoBox>
				</StyledWindowContainer>
				<Menubar/>
			</div>
		)
	}
}

export default Dashboard;