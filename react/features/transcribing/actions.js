import {
    DIAL_TRANSCRIBER,
    STOP_TRANSCRIBING,
    _TRANSCRIBER_JOINED,
    _POTENTIAL_TRANSCRIBER_JOINED,
    _DIAL_ERROR
} from './actionTypes';

/**
 * Dial the transcriber into the room.
 *
 * @public
 * @returns {{
 *     type: DIAL_TRANSCRIBER
 * }}
 */
export function dialTranscriber() {
    return {
        type: DIAL_TRANSCRIBER
    };
}

/**
 * Stop the transcribing by kicking the transcriber.
 *
 * @returns {{type: symbol}}
 */
export function stopTranscribing() {
    return {
        type: STOP_TRANSCRIBING
    };
}

/**
 * Notify that the transcriber has joined with a unique ID.
 *
 * @param {string} participantId - The participant id of the transcriber.
 * @returns {{
 *     type: _TRANSCRIBER_JOINED,
 *     participantId: string
 * }}
 */
export function transcriberJoined(participantId) {
    return {
        type: _TRANSCRIBER_JOINED,
        transcriberJID: participantId
    };
}

/**
 * Notify that a potential transcriber has joined with a unique ID.
 *
 * @param {string} participantId - The participant id of the transcriber.
 * @returns {{
 *     type: _TRANSCRIBER_JOINED,
 *     participantId: string
 * }}
 */
export function potentialTranscriberJoined(participantId) {
    return {
        type: _POTENTIAL_TRANSCRIBER_JOINED,
        transcriberJID: participantId
    };
}

/**
 * Notify that dialing the transcriber resulted in an error.
 *
 * @return {{
 *      type: _DIAL_ERROR
 * }}
 */
export function dialError() {
    return {
        type: _DIAL_ERROR
    };
}
