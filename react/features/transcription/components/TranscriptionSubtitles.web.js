// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

declare var JitsiMeetJS: Object;

const ConferenceEvents = JitsiMeetJS.events.conference;

// const TRANSCRIPTION_RESULT_TOPIC = 'transcription-result';
const REMOVE_AFTER_MS = 3000;

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
class TranscriptionSubtitles extends React.Component {

    /**
     * {@code TranscriptionSubtitles}'s property types.
     *
     * @static
     */
    static propTypes = {

        /**
         * The conference which we can use to add an EventListener to
         */
        _conference: PropTypes.object
    };

    /**
     * Initializes a new {@code TranscriptionSubtitles} instance.
     *
     * @param {Object} props - The read-only React Component props with which
     * the new instance is to be initialized.
     */
    constructor(props) {
        super(props);
        this.state = {

            /**
             * An array of message ID's, which will be added as an variable name
             * for their object to the state.
             */
            knownIDs: [],

            hidden: false

            /**
             * The conference which has an EventEmitter for
             * {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}.
             */
            // conference: props._conference
        };
    }

    /**
     * Callback Listener for {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}
     * events.
     *
     * @param {string} participant - The jid of the participant who send the
     * message. This is expected to be the Jigasi instance.
     * @param {Object} p - The json message payload sent by the Jigasi instance.
     * @returns {void}
     */
    onEndpointMessageReceived(participant, p) {
        console.log('onEndpointMessageReceived', p);

        try {

            // Let's first check if the given object has the correct
            // topic in the payload, which identifies it as a json message send
            // from Jigasi with speech-to-to-text results
            // let p;
            // if (m['jitsi-meet-muc-msg-topic'] === TRANSCRIPTION_RESULT_TOPIC
            //         && (p = m.payload))
            if (p.transcript) {
                console.log('Correct Topic');

                // Extract the useful data from the payload of the JSON message
                const text = p.transcript[0].text;
                const stability = p.stability;
                const isInterim = p.is_interim;
                const id = p.message_id;
                const name = p.participant.name;

                // If this is the first result with the unique message ID,
                // we add it to the state along with the name of the participant
                // who said given text
                if (!this.state[id]) {
                    console.log('First Speaker');
                    this.setState(prevState => {
                        return { knownIDs: prevState.knownIDs.concat([ id ]),
                            [id]: { name } };
                    });
                }

                // If this is final result, update the state as a final result
                // and start a count down to remove the subtitle from the state
                if (!isInterim) {
                    console.log('Not Interim');
                    this.setState(prevState => {
                        const o = prevState[id];

                        o.final = text;

                        return { [id]: o };
                    });

                    setTimeout(() => {
                        this.removeIDFromState(id);
                    }, REMOVE_AFTER_MS);
                } else if (stability > 0.85) {
                    console.log('High Stability');

                    // If the message has a high stability, we can update the
                    // stable field of the state and remove the previously
                    // unstable results
                    this.setState(prevState => {
                        const o = prevState[id];

                        o.stable = text;
                        o.unstable = undefined;

                        return { [id]: o };
                    });
                } else {
                    // Otherwise, this result has an unstable result, which we
                    // add to the state. The unstable result will be localed at
                    // the end of the String, after the stable part.

                    this.setState(prevState => {
                        const o = prevState[id];

                        o.unstable = text;

                        return { [id]: o };
                    });
                }
            }
        } catch (error) {
            console.log('error handling', p, error);
        }
    }

    /**
     * Remove an id from the {@code knownIds} field of the state of this
     * instance. This causes the transcription belonging to the given ID
     * to be removed.
     *
     * @param {string} id - The id to remove.
     * @returns {void}
     */
    removeIDFromState(id) {
        this.setState(prevState => {
            const newKnownIDs = prevState.knownIDs.slice();

            newKnownIDs.splice(newKnownIDs.find(element => element === id), 1);

            return {
                knownIDs: newKnownIDs,
                [id]: undefined
            };
        });
    }

    /**
     * Add {@code onEndpointMessageReceived} as a listener for
     * {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}.
     *
     * @inheritdoc
     */
    componentDidMount() {
        this.addListener(this.props._conference);
    }

    /**
     * Remove {@code onEndpointMessageReceived} as a listener for
     * {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}.
     *
     * @inheritdoc
     */
    componentWillUnmount() {
        this.removeListener(this.props._conference);
    }

    /**
     * Updates the {@code conference} field of the state.
     * When a new prop has a defined conference and the current state does not,
     * it will be added to the state and the event listener will be added.
     * If the next prop has an undefined conference but the current one does
     * have a defined conference, the conference will be removed from the state
     * and the listener will be removed from the conference.
     *
     * @inheritdoc
     * @param {Object} nextProps - The read-only props which this Component will
     * receive.
     * @returns {void}
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps._conference) {
            this.addListener(nextProps._conference);
        }
        if (!nextProps._conference) {
            this.removeListener(this.props._conference);
        }
    }

    /**
     * Add the {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED} listener to
     * the given conference.
     *
     * @param {Object} conference - The conference which has an EventEmitter for
     * {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}.
     * @returns {void}
     */
    addListener(conference) {

        if (conference) {
            conference.eventEmitter.addListener(
                ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED,
                this.onEndpointMessageReceived.bind(this));
        }
    }

    /**
     * Remove the {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED} listener
     * from the given conference.
     *
     * @param {Object} conference - The conference which has an EventEmitter for
     * {@code ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED}.
     * @returns {void}
     */
    removeListener(conference) {
        if (conference) {
            conference.eventEmitter.removeListener(
                ConferenceEvents.ENDPOINT_MESSAGE_RECEIVED,
                this.onEndpointMessageReceived);
        }
    }

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
        const paragraphs = [];

        console.log('Rendering Transcription Subtitles');
        this.state.knownIDs.forEach(id => {
            const o = this.state[id];
            let text;

            if (o) {
                text = `${o.name}: `;

                if (o.final) {
                    text += o.final;
                } else {
                    const stable = o.stable ? o.stable : '';
                    const unstable = o.unstable ? o.unstable : '';

                    text += stable + unstable;
                }
            }

            paragraphs.push(<p key = { id }> { text } </p>);
        });
        const className = 'transcription-subtitles';

        return (
            <div className = { className }>
            My Subtitle{ paragraphs }
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
 *     _conference: Object
 * }}
 */
function _mapStateToProps(state) {
    return {
        _conference: state['features/base/conference'].conference
    };
}

export default connect(_mapStateToProps)(TranscriptionSubtitles);
