import {
    ENDPOINT_MESSAGE_RECEIVED,
    ADD_TRANSCRIPT_MESSAGE,
    UPDATE_TRANSCRIPT_MESSAGE,
    REMOVE_TRANSCRIPT_MESSAGE
} from './actionTypes';
import { ReducerRegistry } from '../base/redux';
import React from 'react';

/**
 * Default State for 'features/transcription' feature
 */
const defaultState = {
    // participantIDs: [],
    transcriptMessages: {},
    transcriptionSubtitles: []
};

/**
 * Listen for actions for the transcription feature to be used by the actions
 * to update the rendered transcription subtitles.
 */
ReducerRegistry.register('features/transcription', (
        state = defaultState, action) => {

    switch (action.type) {
    case ENDPOINT_MESSAGE_RECEIVED:
        return _endpointMessageReceived(state);

    case ADD_TRANSCRIPT_MESSAGE:
        return _addTranscriptMessage(state, action);

    case UPDATE_TRANSCRIPT_MESSAGE:
        return _updateTranscriptMessage(state, action);

    case REMOVE_TRANSCRIPT_MESSAGE:
        return _removeTranscriptMessage(state, action);
    }

    return state;
});

/**
 * Reduces a specific Redux action ADD_TRANSCRIPT_MESSAGE of the feature
 * transcription.
 *
 * @param {Object} state - The Redux state of the feature transcription.
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _endpointMessageReceived(state) {

    const paragraphs = [];

    Object.keys(state.transcriptMessages).forEach((id, index) => {
        console.log(id, index);
        const transcriptMessage = state.transcriptMessages[id];
        let text;

        if (transcriptMessage) {
            text = `${transcriptMessage.participantName}: `;

            if (transcriptMessage.final) {
                text += transcriptMessage.final;
            } else {
                const stable = transcriptMessage.stable
                    ? transcriptMessage.stable : '';
                const unstable = transcriptMessage.unstable
                    ? transcriptMessage.unstable : '';

                text += stable + unstable;
            }
        }

        paragraphs.push(<p key = { id }> { text } </p>);
    });

    return {
        ...state,
        transcriptionSubtitles: paragraphs
    };
}

/**
 * Reduces a specific Redux action ENDPOINT_MESSAGE_RECEIVED of the feature
 * transcription.
 *
 * @param {Object} state - The Redux state of the feature transcription.
 * @param {Action} action -The Redux action ENDPOINT_MESSAGE_RECEIVED to reduce.
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _addTranscriptMessage(state, { transcriptMessageID, participantName }) {

    return {
        ...state,
        transcriptMessages: Object.assign({}, state.transcriptMessages,
            { [transcriptMessageID]: { participantName } })
    };
}

/**
 * Reduces a specific Redux action UPDATE_TRANSCRIPT_MESSAGE of the feature
 * transcription.
 *
 * @param {Object} state - The Redux state of the feature transcription.
 * @param {Action} action -The Redux action UPDATE_TRANSCRIPT_MESSAGE to reduce.
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _updateTranscriptMessage(state,
        { transcriptMessageID, newTranscriptMessage }) {

    return {
        ...state,
        transcriptMessages: Object.assign({}, state.transcriptMessages,
        { [transcriptMessageID]: newTranscriptMessage })
    };
}

/**
 * Reduces a specific Redux action REMOVE_TRANSCRIPT_MESSAGE of the feature
 * transcription.
 *
 * @param {Object} state - The Redux state of the feature transcription.
 * @param {Action} action -The Redux action REMOVE_TRANSCRIPT_MESSAGE to reduce.
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _removeTranscriptMessage(state, { transcriptMessageID }) {

    return {
        ...state,
        transcriptMessages: Object.assign({}, state.transcriptMessages,
            { [transcriptMessageID]: undefined })
    };
}
