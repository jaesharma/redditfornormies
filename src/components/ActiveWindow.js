import React from 'react';
import LoadPost from './LoadPost';
import {connect} from 'react-redux';

const ActiveWindow=({sub,items,posts})=>{
	return (
		<div className="activewin">
			{
				Object.entries(posts).map(([key,value],index)=>{
					if(items.indexOf(key)!==-1){
						return (
								<LoadPost data={value} key={index} ishome={false}/>
						);
					}
				})
			}
		</div>
	);
}

export default ActiveWindow;