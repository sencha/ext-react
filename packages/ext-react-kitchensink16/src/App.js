import React from 'react'
import Layout from './Layout';
//import { HashRouter as Router, Route } from 'react-router-dom' mjg
import { Router, Route } from 'react-router-dom'

import createHistory from 'history/createHashHistory'
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

const history = createHistory();

// load new component when the route changes
history.listen(location => store.dispatch(routeDidChange(location)));

// load the component for the initial route
store.dispatch(routeDidChange(history.location));

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="*" component={Layout} />
      </Router>
    </Provider>
  )
}