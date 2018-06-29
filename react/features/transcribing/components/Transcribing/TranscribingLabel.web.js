// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../base/i18n';

import { CircularLabel } from '../../../base/label';
import Tooltip from '@atlaskit/tooltip';

/**
 * The type of the React {@code Component} props of {@link RecordingLabel}.
 */
type Props = {

    /**
     * Invoked to obtain translated strings.
     */
    t: Function,

    /**
     * Boolean value indicating current transcribing status
     */
    _transcribing: boolean
};

/**
 * The type of the React {@code Component} state of {@link RecordingLabel}.
 */
type State = {

    /**
     * Whether or not the {@link RecordingLabel} should be invisible.
     */
    hidden: boolean
};


/**
 * React Component for displaying a label when a transcriber is in the
 * conference.
 *
 * @extends Component
 */
class TranscribingLabel extends Component<Props> {

    /**
     * Initializes a new {@code TranscribingLabel} instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            hidden: !props._transcribing
        };
    }

    /**
     *
     * @return {*}
     */
    render() {
        if (this.state.hidden) {
            return null;
        }

        return (
            <Tooltip
                content = 'This label indicates that there is a transcriber'
                position = { 'left' }>
                <CircularLabel
                    className = 'recording-label'
                    label = 'TR' />
            </Tooltip>
        );
    }

    componentWillReceiveProps(props) {
        this.setState({
            hidden: !props._transcribing
        });
    }


}


/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code StartRecordingDialog} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 * }}
 */
function _mapStateToProps(state) {
    const { isTranscribing } = state['features/transcribing'];

    return {
        _transcribing: isTranscribing
    };
}

export default translate(connect(_mapStateToProps)(TranscribingLabel));
