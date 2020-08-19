import { keyframes } from "styled-components";

export const pop = keyframes`
	0% { opacity: 0; -webkit-transform: scale(1); }
	80% { opacity: 1; -webkit-transform: scale(1.1); }
	101% { opacity: 1; -webkit-transform: scale(1); }
`;

export const popin = keyframes`
	0% { opacity: 0; -webkit-transform: scale(0.5); }
	80% { opacity: 0; -webkit-transform: scale(1.2); }
	100% { opacity: 1; -webkit-transform: scale(1); }
`;

export const fadein = keyframes`
	0% {opacity: 0;}
	100% {opacity: 1;}
`;

export const FadeInUp = keyframes`
   0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
`;

export const FadeInRight = keyframes`
	  0% {
	    opacity: 0;
	    transform: translate3d(100%, 0, 0);
	  }

	  100% {
	    opacity: 1;
	    transform: none;
	  }
`;

export const FadeInLeft = keyframes`
	  0% {
	    opacity: 0;
	    transform: translate3d(-100%, 0, 0);
	  }

	  100% {
	    opacity: 1;
	    transform: none;
	  }
`;
