export const TOGGLE_SEARCH = 'SCHEDULE::TOGGLE_SEARCH';
export const TOGGLE_FAVORITE = 'SCHEDULE::TOGGLE_FAVORITE';
export const LOAD_SCHEDULE = 'SCHEDULE::LOAD_SCHEDULE';

import { setTitle } from '../actions';

export function toggleSearch(show) {
    return { type: TOGGLE_SEARCH, show };
}

export function toggleFavorite(event) {
    return { type: TOGGLE_FAVORITE, event }
}
