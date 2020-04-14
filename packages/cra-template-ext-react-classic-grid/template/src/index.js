import '@sencha/ext-classic-enterprise-engine';
import '@sencha/ext-classic-enterprise-material';
import React from 'react';
//import ReactDOM from 'react-dom';
import ExtReactDOM from '@sencha/ext-react-classic-enterprise';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
ExtReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

var baseColor = '#024059';
document.documentElement.style.setProperty("--base-color", baseColor);
