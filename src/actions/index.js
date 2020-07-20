import {ADD_SUBREDDIT, DELETE_SUBREDDIT, SELECT_SUBREDDIT, DESELECT_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS} from './action-types';

const request_posts=(subreddit)=>({
	type: REQUEST_POSTS,
	payload: {subreddit}
});

const receive_posts=(subreddit,items,fetchedPosts)=>({
	type: RECEIVE_POSTS,
	payload: {
		subreddit,
		items,
		fetchedPosts,
		lastUpdated: Date.now()
	}
});

export const select_subreddit=(subreddit)=>({
	type: SELECT_SUBREDDIT,
	payload: {subreddit}
});

export const deselect_subreddit=()=>({
	type: DESELECT_SUBREDDIT
});

const add_subreddit=(subreddit,icon)=>({
	type: ADD_SUBREDDIT,
	payload: {subreddit,icon}
});

export const delete_subreddit=(subreddit)=>({
	type: DELETE_SUBREDDIT,
	payload: {subreddit}
})

export const getobj=(data)=>{
	const {id,title:caption,selftext: post,author: username,subreddit,ups: likes,url,is_video}=data;
	let obj={}
	obj[id]={
		id,
		caption,
		post,
		username,
		subreddit,
		url,
		likes,
		is_video,
		hovering: false
	}
	return obj
}

export const fetchPosts=(subreddit)=>{
	return (dispatch)=>{
		dispatch(request_posts(subreddit));
		let fetchedPosts={},items=[]
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
				.then(resp=> resp.json())
				.then(json=> json.data.children.map(child=> {items.push(child.data.id); Object.assign(fetchedPosts,getobj(child.data))}))
				.then(posts=> dispatch(receive_posts(subreddit,items,fetchedPosts)))
				.catch(err=> console.log("error while fetching posts from ",subreddit,err))
	}
}

export const addSubreddit=(subreddit)=>{
	return (dispatch)=>{
		return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
				.then(resp=> resp.json())
				.then(json=> json.data)
				.then(data=> {
					let {icon_img}=data
					if(!icon_img.length) icon_img="https://i.redd.it/130am13nj6201.png"
					dispatch(add_subreddit(subreddit,icon_img))
					dispatch(fetchPosts(subreddit))
				})
				.catch(err=> console.log("error while adding subreddit",err))
	}
}

export const deleteSubreddit=(subreddit)=>{
	return (dispatch,getState)=>{
		console.log("not implemented yet")
	}
}