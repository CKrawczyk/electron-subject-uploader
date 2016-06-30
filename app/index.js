import React from 'react';
import ReactDom from 'react-dom';
import '../css/main.styl';
import apiClient from 'panoptes-client';
import routes from './routes';
import { Router, hashHistory } from 'react-router';


const App = () => (
  <Router history={hashHistory} routes={routes} />
);

// For console access:
if (window) {
  window.zooAPI = apiClient;
}

ReactDom.render(<App />, document.getElementById('root'));
