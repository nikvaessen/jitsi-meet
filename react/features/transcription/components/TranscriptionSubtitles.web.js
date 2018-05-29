

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// declare var JitsiMeetJS: Object;
// const ConferenceEvents = JitsiMeetJS.events.conference;

/**
 * The type of the React {@code Component} props of
 * {@link TranscriptionSubtitles}.
 */
// type Props = {
//
//     /**
//      * The conference which we can use to add an EventListener to
//      */
//     _conference: Object
//
// };

/**
 * The type of the React {@code Component} state of
 * {@link TranscriptionSubtitles}.
 */
// type State = {
//
//     /**
//      * Whether or not the {@link TranscriptionSubtitles} should be invisible.
//      */
//     hidden: boolean,
//
// };

/**
 * React {@code Component} which can display speech-to-text results from
 * Jigasi as subtitles.
 *
 * Jigasi will send a JSON object via
 * {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}. An example of a json
 * object sent by jigasi is:
 *
 * {
 *  'jitsi-meet-muc-msg-topic':'transcription-result',
 *  'payload':{
 *     'transcript':[
 *        {
 *           'confidence':0,
 *           'text':'how are'
 *        }
 *     ],
 *     'is_interim':true,
 *     'language':'en-US',
 *     'message_id':'8360900e-5fca-4d9c-baf3-6b24206dfbd7',
 *     'event':'SPEECH',
 *     'participant':{
 *        'name':'Nik',
 *        'id':'2fe3ac1c'
 *     },
 *     'stability':0.009999999776482582,
 *     'timestamp':'2017-08-21T14:35:46.342Z'
 *  }
 * }
 *
 */
class TranscriptionSubtitles extends React.Component<Props, State> {

    static propTypes = {
        // _conference: PropTypes.object,
        transcriptionSubtitles: PropTypes.arrayOf(PropTypes.element)
    };

    state = {
        hidden: false
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        if (this.state.hidden) {
            return null;
        }
        const className = 'transcription-subtitles';

        return (
            <div className = { className }>
                { this.props.transcriptionSubtitles }
            </div>
        );
    }
}

/**
 * Maps the conference in the Redux state to the associated
 * {@code TranscriptionSubtitles's props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _conference: Object,
 *     transcriptionSubtitles: string
 * }}
 */
function mapStateToProps(state) {
    return {
        // _conference: state['features/base/conference'].conference,
        transcriptionSubtitles:
        state['features/transcription'].transcriptionSubtitles
    };
}

export default connect(mapStateToProps)(TranscriptionSubtitles);
