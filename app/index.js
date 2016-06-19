import React from 'react';
import ReactDom from 'react-dom';
import '../css/main.styl';
import apiClient from 'panoptes-client';
import SignInForm from './sign-in-form';


const App = () => (
  <div className="app">
    <SignInForm />
  </div>
);

// For console access:
if (window) {
  window.zooAPI = apiClient;
}

ReactDom.render(<App />, document.getElementById('root'));
