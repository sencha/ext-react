export const ROUTE_DID_CHANGE = 'ROUTE_DID_CHANGE';
export const TOGGLE_CODE = 'TOGGLE_CODE';
export const TOGGLE_TREE = 'TOGGLE_TREE';

/**
 * To be fired when a new client side route is loaded
 * @param {Location} location 
 */
export function routeDidChange(location) {
    return {
        type: ROUTE_DID_CHANGE,
        location
    }
}

export function toggleCode() {
    return {
        type: TOGGLE_CODE
    }
}

export function toggleTree() {
    return {
        type: TOGGLE_TREE
    }
}