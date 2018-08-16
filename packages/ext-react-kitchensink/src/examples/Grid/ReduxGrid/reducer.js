import { FILTER_CHANGE } from './actions';

const initialState = {
    filter: null
};

export function reducer(state = initialState, action) {

    switch(action.type) {
        case FILTER_CHANGE:
            const { filter } = action;
            return { ...state, filter };
        default: 
            return { ...state };
    }

}