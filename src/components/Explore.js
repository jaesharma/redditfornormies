import React,{Component} from 'react';
import Header from './Header';
import Searchbar from './Searchbar';
import {getobj} from '../actions/';
import PostCard from './PostCard';
import Menubar from './Menubar';
import debounce from "lodash.debounce";

class Explore extends Component{
	constructor(props){
		super(props)
		this.state={
			fetchedPosts:{},
			after: undefined,
			loading: false,
			window_width: window.innerWidth
		}

		window.onscroll=debounce(()=>{
			if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.scrollHeight){
				this.loadposts()
			}
		},100)

		this.updateWidth=this.updateWidth.bind(this)
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
	render(){
		window.addEventListener('resize',this.updateWidth)
		return(
			<div className="explore-container">
				{this.state.window_width>=740? <Header/>:
						<Searchbar ishome={false}/>
				}
				<div className="explorer">
					{
						Object.entries(this.state.fetchedPosts).filter(([key,value],index)=>{
							return !value.is_video
						}).map(([key,value],index)=>{
							return <PostCard key={key} value={value} index={index} />
						})
					}
					<div>{this.state.loading && <img className="mid-loader" src="https://i.gifer.com/ZZ5H.gif"/>}</div>
				</div>
				<Menubar/>
			</div>
		)
	}
}

export default Explore;