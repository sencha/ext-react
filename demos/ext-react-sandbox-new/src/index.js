import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { render } from '@sencha/ext-react-modern';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// function reducer(state, action) {
//     //return { hello: 'hello' };
//     return { ...state };
// }

const initialState = {
    filter: null,
    hello: 'initialstate hello'
};

function reducer(state = initialState, action) {

    switch(action.type) {
        // case FILTER_CHANGE:
        //     const { filter } = action;
        //     return { ...state, filter };
        default:
            return { ...state };
    }

}



let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('div1')
);

// render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('div1')
// );
