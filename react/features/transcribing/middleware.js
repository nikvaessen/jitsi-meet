// @flow

import { MiddlewareRegistry } from '../base/redux';

import { TOGGLE_TRANSCRIBING } from './actionTypes';

declare var APP: Object;

/**
 * Implements the middleware of the feature transcribing.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
// eslint-disable-next-line no-unused-vars
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case TOGGLE_TRANSCRIBING:
        if (typeof APP === 'object') {
            console.log('CALLING TRANSCRIBER INTO THE ROOM :)');

            const x = APP.conference._room.dial('jitsi_meet_transcribe');

            console.log(x);
        }
        break;
    }

    return next(action);
});
