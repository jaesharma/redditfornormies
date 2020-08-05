import postReducer from './postReducer';
import subredditReducer from './subredditReducer';
import authenticationReducer from './authenticationReducer';
import settingsReducer from './settingsReducer';
import {combineReducers} from 'redux';

const rootReducer=combineReducers({
	authenticationReducer,
	postReducer,
	subredditReducer,
	settingsReducer
});

export default rootReducer;