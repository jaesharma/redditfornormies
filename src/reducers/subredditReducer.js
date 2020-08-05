import {ADD_SUBREDDIT, SELECT_SUBREDDIT, DESELECT_SUBREDDIT, LOGGED_IN, LOGOUT, REMOVE_SUBREDDIT} from '../actions/action-types';
import Cookies from 'js-cookie';

const initialState={
	activeSubreddit:undefined,
	subreddits: []
}

const subredditReducer=(state=initialState,action)=>{
	switch(action.type){
		case ADD_SUBREDDIT:
			if(state.subreddits.includes(action.payload.subreddit)) return state;
			let subreddits=state.subreddits!==undefined?[...state.subreddits,action.payload.subreddit]:[action.payload.subreddit]
			if(!action.payload.authenticated){
				Cookies.set('subreddits',JSON.stringify(subreddits))
			}
			return {
				...state,
				subreddits
			}
		case SELECT_SUBREDDIT:
			return {
				...state,
				activeSubreddit: action.payload.subreddit
			}
		case DESELECT_SUBREDDIT:
			return {
				...state,
				activeSubreddit: undefined
			}
		case REMOVE_SUBREDDIT:
			{
				const subreddits= state.subreddits.filter(sub=> sub!==action.payload.subreddit)
				Cookies.set('subreddits',JSON.stringify(subreddits))
				const activeSubreddit=state.activeSubreddit===action.payload.subreddit? undefined: state.activeSubreddit
				return {
					activeSubreddit,
					subreddits
				}
			}
		case LOGGED_IN:
			return {
				activeSubreddit: undefined,
				subreddits: []
			}
		case LOGOUT:{
			return {
				...state,
				subreddits: []
			}
		}
		default:
			return state
	}
}

export default subredditReducer;