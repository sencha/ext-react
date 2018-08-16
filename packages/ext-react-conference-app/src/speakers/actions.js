export const LOAD_SPEAKERS = 'SPEAKERS::LOAD';
export const LOAD_SPEAKER = 'SPEAKERS::LOAD_SPEAKER';

import { setTitle } from '../actions';

export function loadSpeakers() {
    return {
        type: LOAD_SPEAKERS
    }
}

export function loadSpeaker(id) {
    return (dispatch, getState) => {
        const { store, speaker } = getState().speakers;

        if (id) {
            if (!speaker || speaker.id !== id) {
                const doLoad = () => {
                    const speaker = store.getById(id);
                    dispatch({ type: LOAD_SPEAKER, speaker });
                    dispatch(setTitle(speaker.data.name, '/speakers'));
                };

                if (store.isLoaded()) {
                    doLoad();
                } else {
                    store.on('load', doLoad, null, {single: true});
                    
                    // If store hasn't been loaded yet, load it.
                    if (!store.isLoading()) {
                        dispatch(loadSpeakers());
                    }
                }
            }
        } else {
            dispatch(setTitle('Speakers'))
        }
    }
}