import {
	ADD_SUBREDDIT,
	ADD_SUBREDDITS,
	SELECT_SUBREDDIT,
	LOGGED_IN,
	UPDATE_TOKENS,
	UPVOTE,
	DOWNVOTE,
	DESELECT_SUBREDDIT,
	NIGHTMODE,
	LOAD_HOMEPAGE,
	LOGOUT,
	HOMEPAGE,
	HOMEPAGEPOST_UPVOTE,
	HOMEPAGEPOST_DOWNVOTE,
	REQUEST_POSTS,
	RECEIVE_POSTS,
	REMOVE_SUBREDDIT,
} from "./action-types";
import store from "../store";
import {
	getUserInfo,
	getSubInfo,
	getSubreddit,
	refreshData,
} from "./api-calls";

const request_posts = (subreddit) => ({
	type: REQUEST_POSTS,
	payload: { subreddit },
});

const receive_posts = (subreddit, items, posts, after) => ({
	type: RECEIVE_POSTS,
	payload: {
		subreddit,
		items,
		posts,
		after,
		lastUpdated: Date.now(),
	},
});

export const homepage = (fetchedPosts, after) => ({
	type: HOMEPAGE,
	payload: {
		fetchedPosts,
		after,
		lastUpdated: Date.now(),
	},
});

export const select_subreddit = (subreddit) => ({
	type: SELECT_SUBREDDIT,
	payload: { subreddit },
});

export const deselect_subreddit = () => ({
	type: DESELECT_SUBREDDIT,
});

const add_subreddit = (subreddit, icon, authenticated = false) => ({
	type: ADD_SUBREDDIT,
	payload: { subreddit, icon, authenticated },
});

const add_subreddits = (subs, subdata) => ({
	type: ADD_SUBREDDITS,
	payload: { subs, subdata },
});

export const remove_subreddit = (subreddit) => ({
	type: REMOVE_SUBREDDIT,
	payload: { subreddit },
});

export const logged_in = (data, userInfo) => ({
	type: LOGGED_IN,
	payload: { data, userInfo },
});

export const getobj = (data) => {
	const {
		id,
		name,
		created,
		title: caption,
		selftext: post,
		author: username,
		downs,
		score,
		num_comments,
		subreddit,
		ups,
		likes,
		url,
		is_video,
	} = data;
	let obj = {};
	obj[id] = {
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
		hovering: false,
	};
	return obj;
};

export const fetchPosts = (subreddit) => {
	return async (dispatch, getState) => {
		const token = getState().authenticationReducer.access_token;
		const data = getState().postReducer.data;
		let after = undefined;
		if (data.hasOwnProperty(subreddit)) {
			after = getState().postReducer.data[subreddit].after;
		}
		dispatch(request_posts(subreddit));
		if (getState().authenticationReducer.authenticated) {
			return await fetch(
				`https://oauth.reddit.com/r/${subreddit}/new?after=${after}`,
				{
					method: "GET",
					headers: {
						Authorization: `bearer ${token}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			)
				.then((res) => res.json())
				.then((json) => {
					after = json.data.after;
					let posts = {};
					let items = [];
					json.data.children.map((child) => {
						items.push(child.data.id);
						posts = { ...posts, ...getobj(child.data) };
					});
					return { items, posts, after };
				})
				.then(({ items, posts, after }) => {
					dispatch(receive_posts(subreddit, items, posts, after));
				})
				.catch((err) =>
					console.log("error while fetching posts from ", subreddit)
				);
		} else {
			return fetch(
				`https://www.reddit.com/r/${subreddit}.json?after=${after}`
			)
				.then((resp) => resp.json())
				.then((json) => {
					after = json.data.after;
					let items = [];
					let posts = {};
					json.data.children.map((child) => {
						items.push(child.data.id);
						posts = { ...posts, ...getobj(child.data) };
					});
					return { items, posts, after };
				})
				.then(({ items, posts, after }) =>
					dispatch(receive_posts(subreddit, items, posts, after))
				)
				.catch((err) =>
					console.log("error while fetching posts from ", subreddit)
				);
		}
	};
};

export const getHomePage = () => {
	return async (dispatch, getState) => {
		dispatch({ type: LOAD_HOMEPAGE });
		const token = getState().authenticationReducer.access_token;
		const after = getState().postReducer.homepage.after;
		var posts = {};
		if (getState().authenticationReducer.authenticated) {
			fetch(`https://oauth.reddit.com/new?after=${after}`, {
				method: "GET",
				headers: {
					Authorization: `bearer ${token}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
				.then((res) => res.json())
				.then((json) => {
					const after = json.data.after;
					json.data.children.map((child) => {
						let post = getobj(child.data);
						posts = { ...posts, ...post };
					});
					return { posts, after };
				})
				.then(({ posts, after }) => dispatch(homepage(posts, after)))
				.catch((err) => console.log("error while fetching homepage"));
		} else {
			fetch(`https://www.reddit.com/.json?after=${after}`)
				.then((resp) => resp.json())
				.then((json) => {
					const after = json.data.after;
					json.data.children.map((child) => {
						let post = getobj(child.data);
						posts = { ...posts, ...post };
					});
					return { posts, after };
				})
				.then(({ posts, after }) => dispatch(homepage(posts, after)))
				.catch((err) =>
					console.log("error while fetching homepage", err)
				);
		}
	};
};

export const addSubreddit = (subreddit) => {
	return (dispatch, getState) => {
		return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
			.then((resp) => resp.json())
			.then((json) => json.data)
			.then((data) => {
				let { icon_img } = data;
				if (!icon_img.length)
					icon_img = "https://i.redd.it/130am13nj6201.png";
				dispatch(
					add_subreddit(
						subreddit,
						icon_img,
						getState().authenticationReducer.authenticated
					)
				);
			})
			.catch((err) => console.log("error while adding subreddit", err));
	};
};

export const addSubreddits = (subInfo, authenticated = false) => {
	let subdata = {};
	let subs = [];
	subInfo.subs.map((sub) => {
		subs.push(sub.name);
		subdata[sub.name] = {
			fetching: false,
			items: [],
			icon: sub.icon,
			lastUpdate: Date.now(),
		};
	});
	return (dispatch, getState) => {
		dispatch(add_subreddits(subs, subdata));
	};
};

export const removeSubreddit = (subreddit) => {
	return (dispatch, getState) => {
		dispatch(remove_subreddit(subreddit));
	};
};

export const loggedIn = (data) => {
	return async (dispatch, getState) => {
		const token = data.access_token;
		const userInfo = await getUserInfo(token);
		dispatch(logged_in(data, userInfo));
		dispatch(getHomePage());
		dispatch(nightMode(userInfo.pref_nightmode));
		setTimeout(() => {
			getRefreshToken(data.access_token, data.refresh_token);
		}, 3540000);
		window.localStorage.setItem("data", JSON.stringify(data));
		window.localStorage.setItem("nightMode", userInfo.pref_nightmode);
		const subInfo = await getSubInfo(token);
		dispatch(addSubreddits(subInfo));
	};
};

export const logout = () => {
	window.localStorage.removeItem("data");
	window.localStorage.removeItem("nightMode");
	return (dispatch, getState) => {
		dispatch({ type: LOGOUT });
	};
};

export const upvote = (ishome = false, token, id, name, score, likes) => {
	if (likes) {
		var dir = 0;
		var likes = null;
		var score = score - 1;
	} else if (likes === false) {
		var dir = 0;
		var likes = true;
		var score = score + 2;
	} else {
		var dir = 1;
		var likes = true;
		var score = score + 1;
	}
	fetch("https://oauth.reddit.com/api/vote", {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `dir=${dir}&id=${name}&rank=3`,
	}).catch((err) => console.log("error occured while upvoting: ", err));
	if (ishome) {
		return (dispatch, getState) => {
			dispatch({
				type: HOMEPAGEPOST_UPVOTE,
				payload: { id, likes, score },
			});
		};
	}
	return (dispatch, getState) => {
		dispatch({ type: UPVOTE, payload: { id, likes, score } });
	};
};

export const downvote = (ishome, token, id, name, score, likes) => {
	if (likes) {
		var dir = -1;
		var likes = false;
		var score = score - 2;
	} else if (likes === false) {
		var dir = 0;
		var likes = null;
		var score = score + 1;
	} else {
		var dir = -1;
		var likes = false;
		var score = score - 1;
	}
	fetch("https://oauth.reddit.com/api/vote", {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `dir=${dir}&id=${name}&rank=3`,
	}).catch((err) => console.log("error occured while downvoting: ", err));
	if (ishome) {
		return (dispatch, getState) => {
			dispatch({
				type: HOMEPAGEPOST_DOWNVOTE,
				payload: { id, likes, score },
			});
		};
	}
	return (dispatch, getState) => {
		dispatch({ type: DOWNVOTE, payload: { id, likes, score } });
	};
};

export const nightMode = (toggleState = "not_specified") => {
	if (toggleState === "not_specified") {
		return (dispatch, getState) => {
			dispatch({
				type: NIGHTMODE,
				payload: { nightmode: !getState().settingsReducer.nightmode },
			});
		};
	} else {
		return (dispatch, getState) => {
			dispatch({ type: NIGHTMODE, payload: { nightmode: toggleState } });
		};
	}
};

export const getRefreshToken = async (access_token, refresh_token) => {
	refreshData(access_token, refresh_token).then(async (data) => {
		store.dispatch({ type: UPDATE_TOKENS, payload: data });
		await new Promise((r) => setTimeout(r, 3540000));
		if (store.getState().authenticationReducer.authenticated)
			await getRefreshToken(data.access_token, refresh_token);
	});
};
