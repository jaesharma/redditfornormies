import {REQUEST_POSTS, RECEIVE_POSTS, ADD_SUBREDDIT, UPVOTE, DOWNVOTE, LOGGED_IN, LOGOUT, REMOVE_SUBREDDIT} from '../actions/action-types';

const initialState={
	"data":{},
	"posts":{}
}

const postReducer=(state=initialState,action)=>{
	switch(action.type){
		case REQUEST_POSTS:
			return {
				...state,
				data:{
					...state.data,
					[action.payload.subreddit]:{
						...state.data[action.payload.subreddit],
						fetching: true
					}
				}
			}
		case RECEIVE_POSTS:
			const {subreddit, items, fetchedPosts, lastUpdated}=action.payload;
			const {data,posts}=state
			return {
				...state,
				data:{
					...data,
					[subreddit]:{
						...state.data[subreddit],
						fetching: false,
						items,
						lastUpdated
					}
				},
				posts:{
					...posts,
					...fetchedPosts
				}
			}
		case ADD_SUBREDDIT:
			return {
				...state,
				data: {
					...state.data,
					[action.payload.subreddit]:{
						fetching: false,
						items: [],
						icon: action.payload.icon,
						lastUpdated: undefined
					}
				}
			}
		case REMOVE_SUBREDDIT:{
				const subreddit=action.payload.subreddit
				let items=state.data[subreddit].items
				let posts=state.posts
				Object.keys(posts).map((key)=>{
					if(items.includes(key)){
						delete posts[key]
					}
				})
				let data=state.data
				delete data[action.payload.subreddit]
				return {
					...state,
					data: {...data},
					posts: posts
				}
			}
		case LOGGED_IN:{
			return {
				data: {},
				posts: {}
			}
		}
		case LOGOUT:{
			return {
				data: {},
				posts: {}
			}
		}
		case UPVOTE:{
			return{
				...state,
				posts: {
					...state.posts,
					[action.payload.id]:{
						...state.posts[action.payload.id],
						score: action.payload.score,
						likes: action.payload.likes
					}
				}
			}
		}
		case DOWNVOTE:{
			return{
				...state,
				posts: {
					...state.posts,
					[action.payload.id]:{
						...state.posts[action.payload.id],
						score: action.payload.score,
						likes: action.payload.likes
					}
				}
			}
		}
		default:
			return state
	}
}

export default postReducer;