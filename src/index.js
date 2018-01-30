import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './style/app.scss';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, hashHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import AppMain from './components/main/AppMain'
import AppBlogDetail from './components/common/AppPull/AppBlogDetail'
import AppList from './components/common/AppList'
import AppCategory from './components/category/AppCategory'
import AppBlogList from './components/common/AppPull/AppBlogList'

import AppShop from './components/shop/AppShop'

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store = {store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={AppMain} />
        <Route path='/blog/:id' component={AppBlogDetail}></Route>
        <Route path='category' component={AppCategory}></Route>
        <Route path="bloglist/:id" component={AppBlogList}></Route>
        <Route path='/applist/:id' component={AppList}></Route>
        <Route path='/appshop' component={AppShop}></Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
