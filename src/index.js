import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store';
import Cookies from 'js-cookie';
import {select_subreddit, addSubreddit, fetchPosts, deleteSubreddit} from './actions';

let subreddits=[]

try{
	subreddits=JSON.parse(Cookies.get('subreddits'))
}catch(e){
	subreddits=["dankmemes","news"]
}

if(subreddits){
	subreddits.map(sub=>{
		store.dispatch(addSubreddit(sub))
	})
}

ReactDOM.render(
	<Provider store={store}>
    	<App/>
    </Provider>
    ,
  document.getElementById('root')
);