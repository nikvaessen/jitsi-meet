// @flow

import { MiddlewareRegistry } from '../base/redux';

import {
    DIAL_TRANSCRIBER,
    STOP_TRANSCRIBING
} from './actionTypes';
import {
    potentialTranscriberJoined,
    transcriberJoined,
    dialError
} from './actions';
import {
    HIDDEN_PARTICIPANT_JOINED,
    PARTICIPANT_UPDATED
} from './../base/participants';

declare var APP: Object;

const TRANSCRIBER_DIAL_COMMAND = 'jitsi_meet_transcribe';

/**
 * Implements the middleware of the feature transcribing.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
// eslint-disable-next-line no-unused-vars
MiddlewareRegistry.register(store => next => action => {
    const {
        isDialing,
        isTranscribing,
        transcriberJID,
        potentialTranscriberJIDs
    } = store.getState()['features/transcribing'];

    switch (action.type) {
    case DIAL_TRANSCRIBER:
        if (!(isDialing || isTranscribing)) {
            console.log('CALLING TRANSCRIBER INTO THE ROOM :)');

            APP.conference._room.dial(TRANSCRIBER_DIAL_COMMAND).then(
                value => {
                    console.log('successfully dialed!', value);
                },
                value => {
                    console.log('failed to dial!', value);
                    store.dispatch(dialError());
                }
            );
        }
        break;
    case STOP_TRANSCRIBING:
        if (isTranscribing) {
            APP.conference._room.kickParticipant(transcriberJID);
        }
        break;
    case HIDDEN_PARTICIPANT_JOINED:
        console.log('transcription feature: p joined!', action);
        store.dispatch(potentialTranscriberJoined(action.id));

        break;
    case PARTICIPANT_UPDATED: {
        console.log('participant updated: ', action, potentialTranscriberJIDs);
        const { participant } = action;

        if (potentialTranscriberJIDs.includes(participant.id)) {
            console.log('dispatching transcriber joined!', participant.id);
            store.dispatch(transcriberJoined(participant.id));
        }

        break;
    }
    }

    return next(action);
});
