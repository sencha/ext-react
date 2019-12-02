import React from 'react'
import ReactDOM from 'react-dom'
//import { AppContainer } from 'react-hot-loader'
//import { launch } from '@sencha/ext-react-modern'
import App from './App'
import './themer.js'
import '../.ext-reactrc'

let viewport;

Ext.require([
  'Ext.layout.*',
])

ReactDOM.render(<App />, document.getElementById('root'));


// const render = (Component, target) => {
//   ReactDOM.render(<App/>
//     <ExtReact>
//       <AppContainer>
//         <Component/>
//       </AppContainer>
//     </ExtReact>,
//     target
//   )
// }




// import {ExtReact} from '@sencha/ext-react-modern';
// const render = (Component, target) => {
//   ReactDOM.render(
//     <ExtReact>
//       <AppContainer>
//         <Component/>
//       </AppContainer>
//     </ExtReact>,
//     target
//   )
// }

// launch(target => render(App, viewport = target));

// if (module.hot) {
//   module.hot.accept('./App', () => render(App, viewport));
// }

//go({element:App, callback: render});