import React,{Component} from 'react';
import Redditor from './Redditor';
import MainWindow from './MainWindow';
import Header from './Header';
import Menubar from './Menubar';
import User from './User';

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
			<div>
				<Header 
					ishome={true}
					textInputRef={this.textInputRef} 
					focusTextInput={this.focusTextInput} />
				<div className="win-container">
					<div className="content-box">
					  <Redditor focusTextInput={this.focusTextInput}/>
					  <MainWindow/>
					</div>
					<div className="info-box">
						<User/>
					</div>
				</div>
				<Menubar/>
			</div>
		)
	}
}

export default Dashboard;