import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';
import Main from './components/main';
import Detail from './components/detail';

let router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="/item/:id" component={Detail}/>
    </Route>
  </Router>
);
render(router, document.getElementById('app'));