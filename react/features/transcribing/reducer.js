import { ReducerRegistry } from '../base/redux';
import {
    _TRANSCRIBER_JOINED,
    _POTENTIAL_TRANSCRIBER_JOINED,
    DIAL_TRANSCRIBER,
    STOP_TRANSCRIBING, _DIAL_ERROR
} from '../transcribing/actionTypes';

/**
 * Returns initial state for transcribing feature part of Redux store.
 *
 * @returns {{
 * isTranscribing: boolean,
 * isDialing: boolean,
 * transcriberJID: null,
 * potentialTranscriberJIDs: Array
 * }}
 * @private
 */
function _getInitialState() {
    return {
        /**
         * Indicates whether there is currently an active transcriber in the
         * room
         *
         * @type {boolean}
         */
        isTranscribing: false,

        /**
         * Indicated whether the transcriber has been dialed into the room and
         * we're currently awaiting successfull joining or failure of joining
         *
         * @type {boolean}
         */
        isDialing: false,

        /**
         * The JID of the active transcriber
         *
         * @type { string }
         */
        transcriberJID: null,

        /**
         * A list containing potential JID's of transcriber participants
         *
         * @type { Array }
         */
        potentialTranscriberJIDs: []
    };
}

/**
 * Reduces the Redux actions of the feature features/transcribing.
 */
ReducerRegistry.register('features/transcribing',
    (state = _getInitialState(), action) => {
        switch (action.type) {
        case DIAL_TRANSCRIBER:
            return {
                ...state,
                isDialing: true
            };
        case STOP_TRANSCRIBING:
            return {
                ...state,
                isTranscribing: false
            };
        case _DIAL_ERROR:
            return {
                ...state,
                isDialing: false,
                potentialTranscriberJIDs: []
            };
        case _TRANSCRIBER_JOINED:
            return {
                ...state,
                isTranscribing: true,
                isDialing: false,
                transcriberJID: action.transcriberJID
            };
        case _POTENTIAL_TRANSCRIBER_JOINED:
            return {
                ...state,
                potentialTranscriberJIDs:
                    [ action.transcriberJID ]
                        .concat(state.potentialTranscriberJIDs)
            };
        default:
            return state;
        }
    });
