import React from 'react'
import App1 from './App1'
import App2 from './App2'
//import { render } from '@sencha/ext-react-modern'
import ExtReactDOM from '@sencha/ext-react-modern';

ExtReactDOM.render(<App1/>, document.getElementById('div1'));
ExtReactDOM.render(<App2/>, document.getElementById('div2'));
