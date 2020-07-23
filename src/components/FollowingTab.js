import React from 'react';
import {removeSubreddit} from '../actions';

const Followings=({followings,closeftab,dispatch})=>{

	console.log(followings)
	return (
		<div className="followingtab">
			<div className="ftab">
				<div className="ftab__header">
					<p className="ftab__text" >Following</p>
					<p className="ftab__closebtn" onClick={()=>closeftab()}>+</p>
				</div>
				<div className="followings">
					{
						Object.entries(followings).map(([subname,details],index)=>{
							return (
								<div key={index} className="following">
									<img src={details.icon}/>
									{subname.length>12? 
										<p>{subname.substring(0,12)}...</p>:
										<p>{subname}</p>
									}
									<div>
										{ 
											<button 
												className="unfollowbtn" 
												onClick={()=>dispatch(removeSubreddit(subname))}>
												Unfollow
											</button>
										}
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		</div>
	);
}

export default Followings;