import React, { Component } from 'react'
import { Panel } from '@sencha/ext-react-modern'

import Layout from './Layout';
import { Router, Route } from 'react-router-dom'

//import createHistory from 'history'
//import createHistory from 'history/createHashHistory'
const createHistory = require("history").createHashHistory
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import { routeDidChange } from './actions';

const store = createStore(
    reducer,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
        store.replaceReducer(reducer);
    });
}

//const history = createHistory().createHashHistory;
const history = createHistory();

// load new component when the route changes
history.listen(location => store.dispatch(routeDidChange(location)));

// load the component for the initial route
store.dispatch(routeDidChange(history.location));


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="*" component={Layout} />
        </Router>
      </Provider>
    )
  }

  // render2() {
  //   return (
  //     <Panel title="hi"></Panel>
  //   )
  // }

}
// export default function App() {
// // window.React2 = require('react');
// // console.dir(window.React1.version);
// // console.dir(window.React2.version);
// // console.log(window.React1 === window.React2);
//   return (
//     <Provider store={store}>
//       <Router history={history}>
//         <Route path="*" component={Layout} />
//       </Router>
//     </Provider>
//   )
// }
//https://github.com/gaearon/react-hot-loader/tree/7089062eac273832102c074a368d5af27e23e0b0#webpack-plugin