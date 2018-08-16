import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Layout from './Layout';

const store = createStore(
    reducer,
    {
        showOptions: true,
        criteria: { }
    }, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
    return (
        <Provider store={store}>
            <Layout/>
        </Provider>
    )
}

