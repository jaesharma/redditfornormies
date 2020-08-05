export const getUserInfo=(token)=>{
	return fetch(`https://oauth.reddit.com/api/v1/me`,{
				method: 'GET',
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then(res=>res.json())
			.then(json=> {
				let {icon_img,id,name,num_friends,pref_nightmode,total_karma}=json
				icon_img=/(.*)\?/.exec(icon_img)[1]
				const userinfo={
					icon_img,
					id,
					name,
					num_friends,
					pref_nightmode,
					total_karma
				}
				return userinfo
			})
			.catch(err=>{
				console.log('something went wrong',err)
			})
	}

export const getSubInfo=(token)=>{
	return fetch(`https://oauth.reddit.com/subreddits/mine/subscriber?limit=1`,{
		method: 'GET',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
		.then(res=> res.json())
		.then(json=> {
			const after=json.data.after
			const subs=json.data.children.map(child=>{
					const {created, description, display_name, id, subscribers, title}=child.data
					const sub={
						created,
						description,
						display_name,
						id,
						subscribers,
						title
					}
					return sub
			})
			return {after,subs}
		})
		.then(obj=>{
			return obj
		})
		.catch(err=>{
			console.log('error while fetching subs, ',err)
		})
}

export const sub=(token,full_name)=>{
	fetch(`https://oauth.reddit.com/api/subscribe`,{
		method: 'POST',
		headers: {
			'Authorization': `bearer ${token}`,
      		'Content-Type':'application/x-www-form-urlencoded',
			'skip_initial_defaults': '1',
		},
		body: `action=sub&sr=${full_name}`
	 })
	.catch(err=>{
		console.log('sub req. failed... cannot join this subreddit',err)
	})
}

export const unsub=(token,full_name)=>{
	fetch(`https://oauth.reddit.com/api/subscribe`,{
		method: 'POST',
		headers: {
			'Authorization': `bearer ${token}`,
      		'Content-Type':'application/x-www-form-urlencoded'
		},
		body: `action=unsub&sr=${full_name}`
	 })
	.catch(err=>{
		console.log('unsub req. failed... cannot leave this subreddit',err)
	})
}

export const getTrophies=(token)=>{
	return fetch(`https://oauth.reddit.com/api/v1/me/trophies`,{
		method: 'GET',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
		.then(res=> res.json())
		.then(json=>{
			let data={}
			json.data.trophies.map((trophy,index)=>{
				let obj={
					[index]: {
						icon: trophy.data.icon_70,
						name: trophy.data.name
					}
				}
				Object.assign(data,obj)
			})
			return data;
		})
}

export const deleteCall=(token,id)=>{
	fetch(`https://oauth.reddit.com/api/del`,{
		method: 'POST',
		headers: {
			'Authorization': `bearer ${token}`,
      		'Content-Type':'application/x-www-form-urlencoded',
			'skip_initial_defaults': '1',
		},
		body: `id=${id}`
	 })
	.catch(err=>{
		console.log('delete req. failed',err)
	})
}

export const editText=async (token,id,comment)=>{
	await fetch(`https://oauth.reddit.com/api/editusertext`,{
		method: 'POST',
		headers: {
			'Authorization': `bearer ${token}`,
      		'Content-Type':'application/x-www-form-urlencoded',
		},
		body: `api_type=json&return_rtjson=true&text=${comment}&thing_id=${id}`
	 })
	.then(res=> console.log(res))
	.catch(err=>{
		console.log('delete req. failed',err)
	})	
}