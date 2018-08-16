import {
    LOAD_EVENT,
} from './actions';

export default function eventReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EVENT: {
            return { ...state, record: action.event };
        }
        default: 
            return { ...state };
    }
}