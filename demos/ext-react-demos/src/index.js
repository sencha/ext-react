import React from 'react';
import ExtReactDOM from '@sencha/ext-react-modern';
//import '@sencha/ext-react-modern';
//import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';

ExtReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
