import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './style/app.scss';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, hashHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import AppMain from './components/main/AppMain'
import AppBlogDetail from './components/common/AppPull/AppBlogDetail'
import AppList from './components/common/AppList'

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store = {store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={AppMain} />
        <Route path='/blog/:id' component={AppBlogDetail}></Route>
        <Route path='/applist/:id' component={AppList}></Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
