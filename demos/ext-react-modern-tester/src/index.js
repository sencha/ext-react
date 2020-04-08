import React from 'react';
import ExtReactDOM from '@sencha/ext-react-modern';

//import App from './App'; ExtReactDOM.render(<App />, document.getElementById('root'));
//import Button from './Button'; ExtReactDOM.render(<Button />, document.getElementById('root'));
//import Froala from './Froala'; ExtReactDOM.render(<Froala />, document.getElementById('root'));
//import Renderer from './Renderer'; ExtReactDOM.render(<Renderer />, document.getElementById('root'));
//import StoreReplace from './StoreReplace'; ExtReactDOM.render(<StoreReplace />, document.getElementById('root'));

import App from './Chart/AppChart'
//import App from './D3/AppD3'
//import App from './Progress/AppProgress'
//import App from './Grid/AppGrid'
//import App from './DivGrid/AppDivGrid'
//import App from './Render/AppRender'
//import App from './GroupGrid/AppGroupGrid'
//import App from './Form/AppForm'
//import App from './Router/App'
//import App from './Hooks/AppHooks'
//import App from './TextColumn/AppTextColumn'
//import App from './Components/AppComponents'
ExtReactDOM.render(<App/>, document.getElementById('root'));
