export const LOAD_EVENT = 'EVENT::LOAD_EVENT';

import { setTitle } from '../actions';

export function loadEvent(id, title, backButtonURL = '/schedule') {
    return (dispatch, getState) => {
        const { store, event } = getState().schedule;

        if (id) {
            if (!event || event.id !== id) {
                const doLoad = () => {
                    const event = store.getById(id);
                    dispatch({ type: LOAD_EVENT, event });
                    dispatch(setTitle(event.data.title, backButtonURL));
                };

                if (store.isLoaded()) {
                    doLoad();
                } else {
                    store.on('load', doLoad, null, {single: true});
                }
            }
        } else {
            dispatch(setTitle(title))
        }
    }
}
