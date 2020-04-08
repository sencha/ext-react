import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const Ext = window['Ext'];
Ext.onReady(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
});