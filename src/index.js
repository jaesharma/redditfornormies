import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import {Provider} from 'react-redux';
import store from './store';
import './styles/styles.scss';
import {select_subreddit, addSubreddit, fetchPosts, deleteSubreddit} from './actions';

ReactDOM.render(
	<Provider store={store}>
    	<AppRouter/>
    </Provider>
    ,
  document.getElementById('root')
);

const unsubscribe=store.subscribe(()=> console.log(store.getState()));

store.dispatch(addSubreddit('memes'))
store.dispatch(addSubreddit('memes'))

store.dispatch(addSubreddit('dankmemes'))
store.dispatch(fetchPosts('dankmemes'))

// store.dispatch(addSubreddit('pewdiepiesubmissions'))
// store.dispatch(fetchPosts('pewdiepiesubmissions'))

// store.dispatch(addSubreddit('bakchodi'))
// store.dispatch(fetchPosts('bakchodi'))

// store.dispatch(addSubreddit('news'))
// store.dispatch(fetchPosts('news'))

// store.dispatch(addSubreddit('programmers'))
// store.dispatch(fetchPosts('programmers'))

// store.dispatch(addSubreddit('history'))
// store.dispatch(fetchPosts('history'))

// store.dispatch(addSubreddit('aww'))
// store.dispatch(addSubreddit('aww'))

// store.dispatch(addSubreddit('clips'))
// store.dispatch(fetchPosts('clips'))

// store.dispatch(addSubreddit('dogs'))
// store.dispatch(fetchPosts('dogs'))

// store.dispatch(addSubreddit('cats'))
// store.dispatch(fetchPosts('cats'))

// store.dispatch(addSubreddit('india'))
// store.dispatch(fetchPosts('india'))

// store.dispatch(addSubreddit('javascript'))
// store.dispatch(fetchPosts('javascript'))

// store.dispatch(addSubreddit('angular'))
// store.dispatch(fetchPosts('angular'))