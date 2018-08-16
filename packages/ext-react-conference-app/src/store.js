import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import thunk from 'redux-thunk';
import root from './reducer';
import schedule from './schedule/reducer';
import speakers from './speakers/reducer';
import event from './event/reducer';

import { routeChanged } from './actions'; 

const initialState = { };

export const history = createHistory();

const middleware = [
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
];

if (window.devToolsExtension) middleware.push(window.devToolsExtension())

export const store = createStore(
    combineReducers({ root, schedule, speakers, event, router: routerReducer }),
    initialState,
    compose(...middleware)
);

history.listen((location, action) => {
    store.dispatch(routeChanged())
})

store.dispatch(routeChanged())

