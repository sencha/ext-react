import '@sencha/ext-react-material-ui-engine';
import '@sencha/ext-react-material-ui-theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import React from 'react';
//import ReactDOM from 'react-dom';
import ExtReactDOM from '@sencha/ext-react-material-ui';
import './index.css';
import { App } from './App';
import { AppRecent } from './AppRecent';
//import { Live } from './Live';
import * as serviceWorker from './serviceWorker';
ExtReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();

//var baseColor = '#024059';
var baseColor = theme.palette.primary.main;
document.documentElement.style.setProperty("--base-color", baseColor);
