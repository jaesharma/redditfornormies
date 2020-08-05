import React,{Component} from 'react';
import Header from './Header';
import Searchbar from './Searchbar';
import {getobj} from '../actions/';
import PostCard from './PostCard';
import Menubar from './Menubar';
import ViewPost from './ViewPost';
import debounce from "lodash.debounce";
import {StyledExplorer} from '../styles/components/exploreStyles';
import {StyledLoader} from '../styles/components/profileStyles';

class Explore extends Component{
	constructor(props){
		super(props)
		this.state={
			fetchedPosts:{},
			after: undefined,
			loading: false,
			currPostid: undefined,
			viewPost: false,
			window_width: window.innerWidth
		}

		window.onscroll=debounce(()=>{
			if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.scrollHeight){
				this.loadposts()
			}
		},100)

		this.updateWidth=this.updateWidth.bind(this)
		this.viewPost=this.viewPost.bind(this)
		this.hidepost=this.hidepost.bind(this)
		this.handleChanges=this.handleChanges.bind(this)
	}
	componentDidMount(){
		this.loadposts()
	}
	updateWidth(){
		this.setState({window_width: window.innerWidth})
	}
	loadposts(){
		this.setState({loading: true})
		let posts={}
		fetch(`https://www.reddit.com/.json?limit=60&after=${this.state.after}`)
			.then(res=>res.json())
			.then(json=>{this.setState({after: json.data.after});json.data.children.map(child=> Object.assign(posts,getobj(child.data)))})
			.then(now=> this.setState({fetchedPosts: {...this.state.fetchedPosts,...posts},loading: false}))
	}
	viewPost(id){
		this.setState({viewPost: true,currPostid: id})
	}
	hidepost(e){
		this.setState({viewPost: false,currPost: {}})
	}
	handleChanges(id,score,likes){
		this.setState(prevState=>({
			fetchedPosts:{
				...prevState.fetchedPosts,
				[id]:{
					...prevState.fetchedPosts[id],
					score,
					likes
				}
			}
		}))
	}
	render(){
		window.addEventListener('resize',this.updateWidth)
		return(
			<div>
				{this.state.window_width>=740? <Header/>:
						<Searchbar ishome={false}/>
				}
				{
					this.state.viewPost &&
					<ViewPost 
						handleChanges={this.handleChanges} 
						data={this.state.fetchedPosts[this.state.currPostid]} 
						hidePost={this.hidepost}
					/>
				}
				<StyledExplorer>
					{
						Object.entries(this.state.fetchedPosts).filter(([key,value],index)=>{
							return !value.is_video
						}).map(([key,value],index)=>{
							if(value){
								return <PostCard 
											key={key} 
											viewPost={this.viewPost} 
											value={value} 
											index={index} 
										/>
							}else{
								return <div></div>
							}
						})
					}
					<div>{this.state.loading && <StyledLoader size="mid" type="pageload" src="https://i.gifer.com/ZZ5H.gif"/>}</div>
				</StyledExplorer>
				<Menubar/>
			</div>
		)
	}
}

export default Explore;