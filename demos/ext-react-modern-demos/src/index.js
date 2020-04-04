import React from 'react';
import ExtReactDOM from '@sencha/ext-react-modern';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

ExtReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
