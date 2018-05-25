import { ReducerRegistry } from '../base/redux';
import { TOGGLE_TRANSCRIBING } from '../transcribing/actionTypes';

/**
 * Returns initial state for transcribing feature part of Redux store.
 *
 * @private
 * @returns {{
 *     isTranscribing: boolean,
 * }}
 */
function _getInitialState() {
    return {
        /**
         * Indicates whether there is currently a transcriber in the room
         *
         * @type {boolean}
         */
        isTranscribing: false
    };
}

/**
 * Reduces the Redux actions of the feature features/transcribing.
 */
ReducerRegistry.register('features/transcribing',
    (state = _getInitialState(), action) => {
        switch (action.type) {
        case TOGGLE_TRANSCRIBING:
            return {
                ...state,
                isTranscribing: !state.isTranscribing
            };
        default:
            return state;
        }
    });
