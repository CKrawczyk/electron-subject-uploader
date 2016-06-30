import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignInForm from './sign-in-form';
import App from './app';
import Home from './home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="sign-in" component={SignInForm} />
  </Route>
);
