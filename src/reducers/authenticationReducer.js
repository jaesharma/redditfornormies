import { LOGGED_IN, LOGOUT, UPDATE_TOKENS } from "../actions/action-types";

const initialState = {
	authenticated: false,
	access_token: undefined,
	expires_in: 3600,
	refresh_token: undefined,
	scope:
		"account creddits edit privatemessages mysubreddits history identity submit subscribe vote",
	user: {
		icon_img: "/images/defaulticon.png",
		id: "user101",
		name: "reddituser",
		num_friends: undefined,
		pref_nightmode: false,
		total_karma: undefined,
	},
};

const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGGED_IN: {
			const {
				access_token,
				expires_in,
				refresh_token,
				scope,
			} = action.payload.data;
			const {
				icon_img,
				id = "randomid",
				name = "reddituser",
				num_friends,
				pref_nightmode = false,
				total_karma,
			} = action.payload.userInfo;
			return {
				authenticated: true,
				access_token,
				expires_in,
				refresh_token,
				scope,
				user: {
					icon_img,
					id,
					name,
					num_friends,
					pref_nightmode,
					total_karma,
				},
			};
		}
		case LOGOUT: {
			return {
				...initialState,
			};
		}
		case UPDATE_TOKENS: {
			return {
				...state,
				access_token: action.payload.access_token,
			};
		}
		default:
			return state;
	}
};

export default authenticationReducer;
