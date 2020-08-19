export const getUserInfo = (token) => {
	return fetch(`https://oauth.reddit.com/api/v1/me`, {
		method: "GET",
		headers: {
			Authorization: `bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((json) => {
			let {
				icon_img,
				id,
				name,
				num_friends,
				pref_nightmode,
				total_karma,
			} = json;
			icon_img = /(.*)\?/.exec(icon_img)[1];
			const userinfo = {
				icon_img,
				id,
				name,
				num_friends,
				pref_nightmode,
				total_karma,
			};
			return userinfo;
		})
		.catch((err) => {
			console.log("something went wrong", err);
		});
};

export const getSubInfo = async (token, after = undefined) => {
	return await fetch(
		`https://oauth.reddit.com/subreddits/mine/subscriber?after=${after}&limit=100`,
		{
			method: "GET",
			headers: {
				Authorization: `bearer ${token}`,
			},
		}
	)
		.then((res) => res.json())
		.then((json) => {
			const after = json.data.after;
			const subs = json.data.children.map((child) => {
				const {
					created,
					description,
					icon_img: icon,
					display_name: name,
					id,
					subscribers,
					title,
				} = child.data;
				const sub = {
					created,
					description,
					icon,
					name,
					id,
					subscribers,
					title,
				};
				if (!sub.icon) sub.icon = "/images/icon.png";
				return sub;
			});
			return { after, subs };
		})
		.then(async (obj) => {
			if (obj.subs.length < 100) {
				return obj;
			} else {
				let x = await getSubInfo(token, obj.after);
				let subs = [...x.subs, ...obj.subs];
				const after = x.after;
				return { subs, after };
			}
		})
		.catch((err) => {
			console.log("error while fetching subs, ", err);
		});
};

export const sub = (token, full_name) => {
	fetch(`https://oauth.reddit.com/api/subscribe`, {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
			skip_initial_defaults: "1",
		},
		body: `action=sub&sr=${full_name}`,
	}).catch((err) => {
		console.log("sub req. failed... cannot join this subreddit", err);
	});
};

export const unsub = (token, full_name) => {
	fetch(`https://oauth.reddit.com/api/subscribe`, {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `action=unsub&sr=${full_name}`,
	}).catch((err) => {
		console.log("unsub req. failed... cannot leave this subreddit", err);
	});
};

export const getTrophies = (token) => {
	return fetch(`https://oauth.reddit.com/api/v1/me/trophies`, {
		method: "GET",
		headers: {
			Authorization: `bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((json) => {
			let data = {};
			json.data.trophies.map((trophy, index) => {
				data[index] = {
					icon: trophy.data.icon_70,
					name: trophy.data.name,
				};
			});
			return data;
		});
};

export const deleteCall = (token, id) => {
	fetch(`https://oauth.reddit.com/api/del`, {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
			skip_initial_defaults: "1",
		},
		body: `id=${id}`,
	}).catch((err) => {
		console.log("delete req. failed", err);
	});
};

export const editText = async (token, id, comment) => {
	await fetch(`https://oauth.reddit.com/api/editusertext`, {
		method: "POST",
		headers: {
			Authorization: `bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `api_type=json&return_rtjson=true&text=${comment}&thing_id=${id}`,
	})
		.then((res) => console.log(res))
		.catch((err) => {
			console.log("err with text editing", err);
		});
};

export const refreshData = async (access_token, refresh_token) => {
	const clientID = process.env.REACT_APP_CLIENTID;
	const clientSecret = process.env.REACT_APP_CLIENTSECRET;
	const encode = btoa(
		`${process.env.REACT_APP_CLIENTID}:${process.env.REACT_APP_CLIENTSECRET}`
	);
	return await fetch("https://www.reddit.com/api/v1/access_token", {
		method: "POST",
		body: `grant_type=refresh_token&refresh_token=${refresh_token}&duration=permanent`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `basic ${encode}`,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			data["refresh_token"] = refresh_token;
			return data;
		})
		.catch((error) => {
			console.log("error occured while refreshing the token", error);
		});
};
