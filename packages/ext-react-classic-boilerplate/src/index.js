import React from 'react'
//import ReactDOM from 'react-dom'
//import { AppContainer } from 'react-hot-loader'
//import { launch } from '@sencha/ext-react-classic'
//import { ExtReact } from '@sencha/ext-react-classic'
import App from './App'

//let viewport

// Ext.require([
//   'Ext.layout.*',
// ])

// const render = (Component, target) => {
//     ReactDOM.render(
//         <ExtReact>
//           <AppContainer>
//             <Component/>
//           </AppContainer>
//         </ExtReact>,
//         target
//     )
// }

// launch(target => render(App, viewport = target));



import ExtReactDOM from '@sencha/ext-react-classic';
//import { render } from '@sencha/ext-react-modern';

ExtReactDOM.render(<App/>, document.getElementById('root'));
//render(<App/>, document.getElementById('root'));




if (module.hot) {
    module.hot.accept('./App', () => render(App, viewport))
}
