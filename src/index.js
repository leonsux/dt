import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/app.scss';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, hashHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import AppMain from './components/main/AppMain'
import AppBlogDetail from './components/common/AppPull/AppBlogDetail'
import AppCategory from './components/category/AppCategory'
import AppBlogList from './components/common/AppPull/AppBlogList'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={AppMain} />
      <Route path='/blog/:id' component={AppBlogDetail}></Route>
      <Route path='/category' component={AppCategory}></Route>
      <Route path='bloglist/:id' component={AppBlogList}></Route>     
    </Route>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
