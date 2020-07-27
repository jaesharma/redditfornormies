import React from 'react';
import LoadPost from './LoadPost';

const ContentBox=(props)=>(
		<div>
		{
			props.ishome ? 
			<div>
				{Object.entries(props.posts).map(([key,value],index)=>{
					return (
						<div key={value.id}>
							<LoadPost data={value} ishome={props.ishome}/>
						</div>
					);
				})}
			</div>
			:
			<div className="activewin">
				{
					Object.entries(props.posts).map(([key,value],index)=>{
						if(props.items.indexOf(key)!==-1){
							return (
									<LoadPost data={value} key={index} ishome={props.ishome}/>
							);
						}
					})
				}
			</div>
		}
		</div>
);

export default ContentBox;