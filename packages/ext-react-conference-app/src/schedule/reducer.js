import { 
    TOGGLE_SEARCH, 
    TOGGLE_FAVORITE,
    LOAD_SCHEDULE
} from './actions';

let favorites = localStorage.getItem('favoriteEvents');
favorites = favorites ? JSON.parse(favorites) : []

const initialState = {
    favorites,
    showSearch: false,
    store: Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/schedule.json'
        },
        listeners: {
            load: store => store.each(record => record.set('favorite', favorites.indexOf(record.getId()) !== -1))
        }
    })
}

export default function scheduleReducer(state = initialState, action) {

    switch(action.type) {
        case TOGGLE_SEARCH: {
            if (action.hasOwnProperty('show')) {
                return { ...state, showSearch: !state.showSearch }
            } else {
                return { ...state, showSearch: !state.showSearch }
            }
        }
        case TOGGLE_FAVORITE: {
            const { event } = action;
            const record = state.store.findRecord('id', event);
            let favorites;

            if (state.favorites.indexOf(event) === -1) {
                record.set('favorite', true);
                favorites = [...state.favorites, event]
            } else {
                record.set('favorite', false);
                favorites = state.favorites.filter(e => e !== event);
            }

            localStorage.setItem('favoriteEvents', JSON.stringify(favorites));

            return { ...state, favorites }
        }
        case LOAD_SCHEDULE: {
            state.store.load();
            return { ...state };
        }
        default:
            return { ...state };
    }

}