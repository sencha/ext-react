import 'babel-polyfill';
import React from 'react';
import App from './App';
import { launch } from '@extjs/reactor';
import {ExtReact} from '@sencha/ext-modern'

launch(<ExtReact> <App/> </ExtReact>);
