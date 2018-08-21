import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { launch } from '@sencha/ext-react';

import {ExtReact} from '@sencha/ext-react';
// include all ExtReact components so we can use them directly in jest tests.
Ext.require('Ext.*');

launch(<ExtReact><App/></ExtReact>, { debug: true });