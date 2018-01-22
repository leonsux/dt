import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/app.scss';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, hashHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import AppMain from './components/main/AppMain'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={AppMain} />
    </Route>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
