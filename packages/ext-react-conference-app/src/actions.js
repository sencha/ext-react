export const TOGGLE_MENU = 'ROOT::TOGGLE_MENU';
export const TOGGLE_SEARCH = 'ROOT::TOGGLE_SEARCH';
export const SEARCH = 'ROOT::SEARCH';
export const SET_TITLE = 'ROOT::SET_TITLE';
export const ROUTE_CHANGED = 'ROOT::ROUTE_CHANGED';

/**
 * Show/hide the menu
 * @param {Boolean} show 
 */
export function toggleMenu(show) {
    return {
        type: TOGGLE_MENU,
        show
    }
}

/**
 * Show/hide the search view
 */
export function toggleSearch() {
    return {
        type: TOGGLE_SEARCH
    }
}

export function search(query) {
    return {
        type: SEARCH,
        query
    }
}

export function routeChanged() {
    return {
        type: ROUTE_CHANGED,
    }
}

/**
 * Updates the contents of the titlebar
 * @param {*} title 
 * @param {*} showBackButton 
 */
export function setTitle(title, backButtonURL) {
    return {
        type: SET_TITLE,
        title,
        backButtonURL
    }
}