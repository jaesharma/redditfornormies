import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	ADD_SUBREDDIT,
	ADD_SUBREDDITS,
	HOMEPAGE,
	HOMEPAGEPOST_UPVOTE,
	HOMEPAGEPOST_DOWNVOTE,
	UPVOTE,
	DOWNVOTE,
	LOAD_HOMEPAGE,
	LOGGED_IN,
	LOGOUT,
	REMOVE_SUBREDDIT,
} from "../actions/action-types";
import _ from "lodash";

const initialState = {
	data: {},
	posts: {},
	homepage: {
		loading: false,
		fetchedPosts: {},
		after: undefined,
		lastUpdated: undefined,
	},
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_POSTS:
			return {
				...state,
				data: {
					...state.data,
					[action.payload.subreddit]: {
						...state.data[action.payload.subreddit],
						fetching: true,
					},
				},
			};
		case RECEIVE_POSTS:
			let {
				subreddit,
				items,
				posts: fetchedPosts,
				after,
				lastUpdated,
			} = action.payload;
			let { data, posts } = state;
			posts = { ...posts, ...fetchedPosts };
			posts = _.shuffle(posts);
			posts = _.keyBy(posts, "id");
			return {
				...state,
				data: {
					...data,
					[subreddit]: {
						...state.data[subreddit],
						fetching: false,
						items,
						after,
						lastUpdated,
					},
				},
				posts,
			};
		case LOAD_HOMEPAGE: {
			return {
				...state,
				homepage: {
					...state.homepage,
					loading: true,
				},
			};
		}
		case HOMEPAGE: {
			let { fetchedPosts, after, lastUpdated } = action.payload;
			return {
				...state,
				homepage: {
					loading: false,
					fetchedPosts: {
						...state.homepage.fetchedPosts,
						...fetchedPosts,
					},
					after,
					lastUpdated,
				},
			};
		}
		case HOMEPAGEPOST_UPVOTE: {
			let { id, likes, score } = action.payload;
			return {
				...state,
				homepage: {
					...state.homepage,
					fetchedPosts: {
						...state.homepage.fetchedPosts,
						[id]: {
							...state.homepage.fetchedPosts[id],
							likes,
							score,
						},
					},
				},
			};
		}
		case HOMEPAGEPOST_DOWNVOTE: {
			let { id, likes, score } = action.payload;
			return {
				...state,
				homepage: {
					...state.homepage,
					fetchedPosts: {
						...state.homepage.fetchedPosts,
						[id]: {
							...state.homepage.fetchedPosts[id],
							likes,
							score,
						},
					},
				},
			};
		}
		case ADD_SUBREDDIT:
			return {
				...state,
				data: {
					...state.data,
					[action.payload.subreddit]: {
						fetching: false,
						items: [],
						icon: action.payload.icon,
						after: undefined,
						lastUpdated: undefined,
					},
				},
			};
		case ADD_SUBREDDITS:
			return {
				...state,
				data: {
					...state.data,
					...action.payload.subdata,
				},
			};
		case REMOVE_SUBREDDIT: {
			const subreddit = action.payload.subreddit;
			let items = state.data[subreddit].items;
			let posts = state.posts;
			Object.keys(posts).map((key) => {
				if (items.includes(key)) {
					delete posts[key];
				}
			});
			let data = state.data;
			delete data[action.payload.subreddit];
			return {
				...state,
				data: { ...data },
				posts: posts,
			};
		}
		case LOGGED_IN: {
			return {
				...initialState,
			};
		}
		case LOGOUT: {
			return {
				...initialState,
			};
		}
		case UPVOTE: {
			return {
				...state,
				posts: {
					...state.posts,
					[action.payload.id]: {
						...state.posts[action.payload.id],
						score: action.payload.score,
						likes: action.payload.likes,
					},
				},
			};
		}
		case DOWNVOTE: {
			return {
				...state,
				posts: {
					...state.posts,
					[action.payload.id]: {
						...state.posts[action.payload.id],
						score: action.payload.score,
						likes: action.payload.likes,
					},
				},
			};
		}
		default:
			return state;
	}
};

export default postReducer;
