import { 
    UPDATE_CRITERIA, 
    TOGGLE_OPTIONS 
} from './actions';

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case UPDATE_CRITERIA:
            return { ...state, criteria: { ...state.criteria, ...action.criteria } }
        case TOGGLE_OPTIONS:
            return { ...state, showOptions: !state.showOptions };
        default: 
            return { ...state };
    }

}