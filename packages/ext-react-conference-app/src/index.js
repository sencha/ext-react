import React from 'react';
import ExtReactDOM from '@sencha/ext-react-modern';
import App from './App';
import * as d3 from 'd3';
window.d3 = d3;

ExtReactDOM.render(<App />, document.getElementById('root'));
