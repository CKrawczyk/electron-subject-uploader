import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import Home from './home';
import { Project, SubjectSet } from './project';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path=":projectID" component={Project}>
      <Route path="subject-set/:subjectSetID" component={SubjectSet} />
    </Route>
  </Route>
);
