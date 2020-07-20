import postReducer from './postReducer';
import subredditReducer from './subredditReducer';
import {combineReducers} from 'redux';

const rootReducer=combineReducers({
	postReducer,
	subredditReducer
});

export default rootReducer;