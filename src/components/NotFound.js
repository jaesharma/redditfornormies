import React from 'react';
import Header from './Header';
import {StyledPageCover, StyledImg} from '../styles/components/notFoundPageStyles';

const NotFound=()=>{
	return (
		<div>
			<Header ishome={true} />
			<StyledPageCover>
				<StyledImg src="/images/Astronaut.png" />
				<h1>404</h1>
				<p>The page you are looking for doesn't exist or has been moved.</p>
			</StyledPageCover>
		</div>
	);
}

export default NotFound;