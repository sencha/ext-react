export const UPDATE_CRITERIA = 'UPDATE_CRITERIA';
export const TOGGLE_OPTIONS = 'TOGGLE_OPTIONS';

export function updateCriteria(criteria) {
    return {
        type: UPDATE_CRITERIA,
        criteria
    }
}

export function toggleOptions() {
    return {
        type: TOGGLE_OPTIONS
    }
}