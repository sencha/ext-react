export const FILTER_CHANGE = 'FILTER_CHANGE';

export function filterChange(filter) {
    return {
        type: FILTER_CHANGE,
        filter
    };
}