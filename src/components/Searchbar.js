import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {history} from '../router/AppRouter';
import {select_subreddit, addSubreddit} from '../actions';
import {sub} from '../actions/api-calls';
import styled from 'styled-components';
import {StyledSearchbar,StyledSearchInput,StyledSearchIcon,
		StyledSearchResults,StyledClearBtn,StyledAddBtn,
		StyledSearchedSub,StyledSearchedSubContainer,StyledSearchedResultsArrow}
		from '../styles/components/searchbarStyles';
import {StyledLoader} from '../styles/components/profileStyles';

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
		fetch(`https://www.reddit.com/search.json?q=${query}&type=sr`)
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
		if(this.props.authenticated){
			sub(this.props.access_token,this.state.subdetails.full_name)
		}
	}
	clear=()=>{
		this.setState({value: '',subs: []})
	}
	render(){
		return (
			<StyledSearchbar ishome={this.props.ishome}>
				<StyledSearchInput 
					onFocus={this.onFocusHandler}
					onChange={this.onChangeHandler}
					onBlur={this.onBlurHandler}
					type='text' 
					tabIndex="1"
					value={this.state.value}
					ref={this.props.textInputRef}
					placeholder="Search"/>
				<StyledSearchIcon className="icon" type={!!this.state.value? "fix": "pseudo"}>&#128269;&#xFE0E;</StyledSearchIcon>
				{this.state.focus && !!this.state.value.length && 
					<span>
						{this.state.loading? <StyledLoader size="sm" type="input" src="/loaders/spinner.gif"/> :
						<StyledClearBtn onClick={this.clear}>+</StyledClearBtn>}
					</span>
				}
				{this.state.focus && this.state.subs.length>0 && 
				<StyledSearchedResultsArrow>
					<StyledSearchResults>
						{
						  this.state.subs.map((sub)=>{
						  let icon=''
						  {sub.icon_img===''? icon="/images/icon.png":icon=sub.icon_img}
						  return (
						  	<StyledSearchedSubContainer key={sub.id}>
							  	<StyledSearchedSub
							  		onClick={()=> {
							  			this.setState({value: '',subs: []})
							  			this.props.history.push(`/r/${sub.name}`)
							  		}}
							  		name={sub.name}
							  		key={sub.id}
							  		>
							  		<img src={icon}/>
							  		<b>r/{sub.name}</b>
							  		<p>{sub.title}</p>
							  	</StyledSearchedSub>
						  		{!this.props.subreddits.includes(sub.name) && 
						  		 <StyledAddBtn size="mid" onClick={()=> this.addSub(`r/${sub.name}`)}>+</StyledAddBtn>
						  		}
						  	</StyledSearchedSubContainer>
					       );
						  })
						}
					</StyledSearchResults>
				</StyledSearchedResultsArrow>
				}
			</StyledSearchbar>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		subreddits: state.subredditReducer.subreddits
	}
}

export default withRouter(connect(mapStateToProps)(Searchbar));