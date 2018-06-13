import { TOGGLE_TRANSCRIBING } from '../transcribing/actionTypes';

/**
 * Start or stop recording.
 *
 * @returns {{
 *     type: TOGGLE_RECORDING
 * }}
 */
export function toggleTranscribing() {
    return {
        type: TOGGLE_TRANSCRIBING
    };
}
