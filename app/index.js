import React from 'react';
import ReactDom from 'react-dom';
import '../css/main.styl';

const App = () => (
  <div className="app">
    Testing!
  </div>
);

ReactDom.render(<App />, document.getElementById('root'));
