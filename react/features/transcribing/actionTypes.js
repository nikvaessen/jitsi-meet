/**
 * The type of Redux action triggering the transcriber to join (be 'dialed' in)
 *
 * {
 *     type: DIAL_TRANSCRIBER
 * }
 * @public
 */
export const DIAL_TRANSCRIBER = Symbol('DIAL_TRANSCRIBER');

/**
 * The type of Redux action triggering the transcriber to leave.
 *
 * @type {symbol}
 */
export const STOP_TRANSCRIBING = Symbol('STOP_TRANSCRBIBING');

/**
 * The type of Redux action triggering storage of participantId of transcriber,
 * so that it can later be kicked
 *
 * {
 *     type: TRANSCRIBER_JOINED,
 *     participantId: String
 * }
 * @private
 */
export const _TRANSCRIBER_JOINED = Symbol('TRANSCRIBER_JOINED');

export const _POTENTIAL_TRANSCRIBER_JOINED
    = Symbol('POTENTIAL_TRANSCRIBER_JOINED');


export const _DIAL_ERROR = Symbol('DIAL_ERROR');
