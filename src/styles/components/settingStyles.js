import styled from 'styled-components';
import {fadein, popin} from './animations';

export const StyledSwitch=styled.label`
  position: relative;
  display: inline-block;
  float: left;
  width: 38px;
  height: 18px;
  &>input {
	  opacity: 0;
	  width: 0;
	  height: 0;
  }
  &>.slider {
	  position: absolute;
	  cursor: pointer;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-color: #ccc;
	  -webkit-transition: .4s;
	  transition: .4s;
   }
   &>.slider,&>.round {
  		border-radius: 34px;
   }
   &>.slider:before {
	  position: absolute;
	  content: "";
	  height: 16px;
	  width: 16px;
	  top: 1px;
	  left: 2px;
	  background-color: white;
	  -webkit-transition: .4s;
	  transition: .4s;
	}
	input:checked + .slider {
  		background-color: #2196F3;
	}

	input:focus + .slider {
	  box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
	  -webkit-transform: translateX(18px);
	  -ms-transform: translateX(18px);
	  transform: translateX(18px);
	}

	.slider.round:before {
	  border-radius: 50%;
	}
   
`

export const StyledLabelText=styled.div`
	float: left;
	margin: 0 1rem;
	font-size: .7rem;
	font-size: 1rem;
`