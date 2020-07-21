import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {history} from '../router/AppRouter';
import {select_subreddit, addSubreddit} from '../actions';

let timeout=null

class Searchbar extends React.Component{
	constructor(props){
		super(props)
		this.state={
			focus: false,
			subs: [],
			value: '',
			loading: false
		}
	}
	onChangeHandler=(e)=>{
		this.setState({focus: true,value: e.target.value,loading: true})
		clearTimeout(timeout);
		let value=e.target.value
		timeout=setTimeout(function(query,that){
		let obj={}
		fetch(`http://www.reddit.com/search.json?q=${query}&type=sr`)
			.then(res=> res.json())
			.then(json=>json.data.children.map((sub)=>{
				const {id,display_name:name,title,icon_img,subscribers,public_description:description}=sub.data
				obj={
					id,
					name,
					title,
					icon_img,
					subscribers,
					description
				}
				return obj
			}))
			.then(subs=> that.setState({subs,loading: false}))
			.catch(err=> {that.setState({loading: false})})
		},1000,value,this)
	}
	onFocusHandler=()=>{
		this.setState({focus: true})
	}
	onBlurHandler=(e)=>{
		setTimeout(()=>{
			this.setState({focus: false})
		},1000)
	}
	addSub=(sub)=>{
		this.setState({value: '',subs: []})
		this.props.dispatch(addSubreddit(sub.slice(2,)))
	}
	clear=()=>{
		this.setState({value: ''})
	}
	render(){
		return (
			<div className={this.props.ishome? "search-box search_box-home": "search-box search_box-explore"}>
				<input 
					onFocus={this.onFocusHandler}
					onChange={this.onChangeHandler}
					onBlur={this.onBlurHandler}
					type='text' 
					className="search"
					value={this.state.value}
					ref={this.props.textInputRef}
					placeholder="Search"/>
				{!!this.state.value ? <span className="search-icon search-icon__fix">&#128269;&#xFE0E;</span>:
					<span className="search-icon search-icon__placeholder">&#128269;&#xFE0E;</span>
				}
				{this.state.focus && !!this.state.value.length && 
					<span>
						{this.state.loading? <img className="sm-loader" src="https://i.gifer.com/ZZ5H.gif"/> :
						<span onClick={this.clear} className="clear-btn">+</span>}
					</span>
				}
				{this.state.focus && 
				<div className="search-results">
					{
					  this.state.subs.map((sub)=>{
					  let icon=''
					  {sub.icon_img===''? icon="https://i.redd.it/130am13nj6201.png":
					  	icon=sub.icon_img
					  }
					  return (
					  	<div className="searched-sub-container" key={sub.id}>
						  	<div
						  		className="searched-sub" 
						  		onClick={()=> {
						  			this.props.history.push(`/r/${sub.name}`)
						  		}}
						  		name={sub.name}
						  		key={sub.id}
						  		>
						  		<img className="searched-sub__icon" src={icon}/>
						  		<b className="searched-sub__name">r/{sub.name}</b>
						  		<p className="searched-sub__title">{sub.title}</p>
						  	</div>
					  		{!this.props.subreddits.includes(sub.name) && 
					  		 <button className="addbtn" onClick={()=> this.addSub(`r/${sub.name}`)}>+</button>
					  		}
					  	</div>
				       );
					  })
					}
				</div>
				}
			</div>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		subreddits: state.subredditReducer.subreddits
	}
}

export default withRouter(connect(mapStateToProps)(Searchbar));