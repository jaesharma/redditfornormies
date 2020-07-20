import {REQUEST_POSTS, RECEIVE_POSTS, ADD_SUBREDDIT, DELETE_SUBREDDIT} from '../actions/action-types';

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
		case DELETE_SUBREDDIT:{
				const subreddit=action.payload.subreddit
				return {
					...state,
				}
			}
		default:
			return state
	}
}

export default postReducer;