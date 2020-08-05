import {ADD_SUBREDDIT, SELECT_SUBREDDIT, LOGGED_IN, UPVOTE, DOWNVOTE,
 DESELECT_SUBREDDIT, NIGHTMODE, LOGOUT, REQUEST_POSTS, RECEIVE_POSTS,
 REMOVE_SUBREDDIT} from './action-types';
import {getUserInfo, getSubInfo, getSubreddit} from './api-calls';

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

const add_subreddit=(subreddit,icon,authenticated=false)=>({
	type: ADD_SUBREDDIT,
	payload: {subreddit,icon,authenticated}
});

export const remove_subreddit=(subreddit)=>({
	type: REMOVE_SUBREDDIT,
	payload: {subreddit}
})

export const logged_in=(data,userInfo)=>({
	type: LOGGED_IN,
	payload: {data,userInfo}
})

export const getobj=(data)=>{
	const {id,name,created,title:caption,selftext: post,author: username,downs,score,num_comments,subreddit,ups,likes,url,is_video}=data;
	let obj={}
	obj[id]={
		id,
		name,
		created,
		caption,
		post,
		username,
		subreddit,
		num_comments,
		ups,
		downs,
		likes,
		score,
		url,
		is_video,
		hovering: false
	}
	return obj
}

export const fetchPosts=(subreddit)=>{
	return async (dispatch,getState)=>{
		const token=getState().authenticationReducer.access_token
		var fetchedPosts={},items=[]
		dispatch(request_posts(subreddit));
		if(getState().authenticationReducer.authenticated){
			return await fetch(`https://oauth.reddit.com/r/${subreddit}/new`,{
				method: 'GET',
				headers: {
					Authorization: `bearer ${token}`,
      				'Content-Type':'application/x-www-form-urlencoded'
				}
			})
			.then(res=>res.json())
			.then(json=> {
					json.data.children.map(child=>{
						items.push(child.data.id);
						Object.assign(fetchedPosts,getobj(child.data))
				})
			})
			.then(posts=> dispatch(receive_posts(subreddit,items,fetchedPosts)))
			.catch(err=> console.log("error while fetching posts from ",subreddit,err))
		}else{
			var fetchedPosts={},items=[]
			return fetch(`https://www.reddit.com/r/${subreddit}.json`)
					.then(resp=> resp.json())
					.then(json=> json.data.children.map(child=> {items.push(child.data.id); Object.assign(fetchedPosts,getobj(child.data))}))
					.then(posts=> dispatch(receive_posts(subreddit,items,fetchedPosts)))
					.catch(err=> console.log("error while fetching posts from ",subreddit,err))
		}
	}
}

export const addSubreddit=(subreddit)=>{
	return (dispatch,getState)=>{
		return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
				.then(resp=> resp.json())
				.then(json=> json.data)
				.then(data=> {
					let {icon_img}=data
					if(!icon_img.length) icon_img="https://i.redd.it/130am13nj6201.png"
					dispatch(add_subreddit(subreddit,icon_img,getState().authenticationReducer.authenticated))
					dispatch(fetchPosts(subreddit))
				})
				.catch(err=> console.log("error while adding subreddit",err))
	}
}

export const removeSubreddit=(subreddit)=>{
	return (dispatch,getState)=>{
		dispatch(remove_subreddit(subreddit))
	}
}

export const loggedIn=(data)=>{
	return async (dispatch,getState)=>{
		const token=data.access_token
		const userInfo=await getUserInfo(token)
		dispatch(logged_in(data,userInfo))
		const subInfo=await getSubInfo(token)
		subInfo.subs.map(sub=> {
			dispatch(addSubreddit(sub.display_name,sub.icon_img))
			dispatch(fetchPosts(sub.display_name))
			if(userInfo.pref_nightmode){
				dispatch(nightMode())
			}
		})
	}
}

export const logout=()=>{
	return (dispatch,getState)=>{
		dispatch({type: LOGOUT})
	}
}

export const upvote=(token,id,name,score,likes)=>{
	if(likes){
		var dir=0
		var likes=null
		var score=score-1
	}
	else if(likes===false){
		var dir=0
		var likes=true
		var score=score+2
	}
	else{
		var dir=1
		var likes=true
		var score=score+1
	}
	fetch("https://oauth.reddit.com/api/vote",{
		method: 'POST',
		headers: {
			'Authorization': `bearer ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `dir=${dir}&id=${name}&rank=3`
	})
	.catch(err=>console.log("error occured while upvoting: ",err))
	return (dispatch,getState)=>{
		dispatch({type: UPVOTE,payload: {id,likes,score}})
	}
}

export const downvote=(token,id,name,score,likes)=>{
	if(likes){
		var dir=-1
		var likes=false
		var score=score-2
	}
	else if(likes===false){
		var dir=0
		var likes=null
		var score=score+1
	}
	else{
		var dir=-1
		var likes=false
		var score=score-1
	}
	fetch("https://oauth.reddit.com/api/vote",{
		method: 'POST',
		headers: {
			'Authorization': `bearer ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `dir=${dir}&id=${name}&rank=3`
	})
	.catch(err=>console.log("error occured while downvoting: ",err))
	return (dispatch,getState)=>{
		dispatch({type: DOWNVOTE,payload: {id,likes,score}})
	}
}

export const nightMode=()=>{
	return (dispatch,getState)=>{
		dispatch({type: NIGHTMODE,payload: {nightmode: !getState().settingsReducer.nightmode}})
	}
}