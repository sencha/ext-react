import '@sencha/ext-classic-grid-engine';
import '@sencha/ext-classic-grid-material';
import React from 'react';
//import ReactDOM from 'react-dom';
import ExtReactDOM from '@sencha/ext-react-classic-grid';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
ExtReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

document.documentElement.style.setProperty("--base-color", "#024059");
