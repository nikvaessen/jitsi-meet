// @flow

import { MiddlewareRegistry } from '../base/redux';

import {
    _TRANSCRIBER_LEFT,
    DIAL_TRANSCRIBER,
    STOP_TRANSCRIBING
} from './actionTypes';
import {
    potentialTranscriberJoined,
    transcriberJoined,
    transcriberLeft,
    dialError,
    showPendingTranscribingNotification,
    hidePendingTranscribingNotification,
    showStoppedTranscribingNotification,
    showTranscribingError
} from './actions';
import {
    HIDDEN_PARTICIPANT_JOINED,
    HIDDEN_PARTICIPANT_LEFT,
    PARTICIPANT_UPDATED
} from './../base/participants';

declare var APP: Object;

const TRANSCRIBER_DIAL_COMMAND = 'jitsi_meet_transcribe';
const TRANSCRIBER_DISPLAY_NAME = 'Transcriber';

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
            store.dispatch(showPendingTranscribingNotification());

            APP.conference._room.dial(TRANSCRIBER_DIAL_COMMAND).then(
                value => {
                    console.log('successfully dialed!', value);
                },
                value => {
                    console.log('failed to dial!', value);
                    store.dispatch(dialError());
                    store.dispatch(hidePendingTranscribingNotification());
                    store.dispatch(showTranscribingError());
                }
            );
        }
        break;
    case STOP_TRANSCRIBING:
        if (isTranscribing) {
            APP.conference._room.kickParticipant(transcriberJID);
        }
        break;
    case _TRANSCRIBER_LEFT:
        store.dispatch(showStoppedTranscribingNotification());
        break;
    case HIDDEN_PARTICIPANT_JOINED:
        console.log('transcription feature: p joined!', action);
        if (action.displayName
                && action.displayName === TRANSCRIBER_DISPLAY_NAME) {
            store.dispatch(transcriberJoined(action.id));
        } else {
            store.dispatch(potentialTranscriberJoined(action.id));
        }

        break;
    case HIDDEN_PARTICIPANT_LEFT:
        console.log('transcription feature: p left!', action);
        if (action.id === transcriberJID) {
            store.dispatch(transcriberLeft(action.id));
        }
        break;
    case PARTICIPANT_UPDATED: {
        console.log('participant updated: ', action, potentialTranscriberJIDs);
        const { participant } = action;

        if (potentialTranscriberJIDs.includes(participant.id)
            && participant.name === TRANSCRIBER_DISPLAY_NAME) {
            console.log('dispatching transcriber joined!', participant.id);
            store.dispatch(transcriberJoined(participant.id));
            store.dispatch(hidePendingTranscribingNotification());
        }

        break;
    }
    }

    return next(action);
});
