import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import {Provider} from 'react-redux';
import store from './store';
import Cookies from 'js-cookie';
import './styles/styles.scss';
import {select_subreddit, addSubreddit, fetchPosts, deleteSubreddit} from './actions';

const subreddits=Cookies.get('subreddits')

if(subreddits){
	JSON.parse(subreddits).map(sub=>{
		store.dispatch(addSubreddit(sub))
		store.dispatch(fetchPosts(sub))
	})
}

ReactDOM.render(
	<Provider store={store}>
    	<AppRouter/>
    </Provider>
    ,
  document.getElementById('root')
);