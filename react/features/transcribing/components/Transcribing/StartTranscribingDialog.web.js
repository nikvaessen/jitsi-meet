// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';

import { dialTranscriber } from '../../actions';

/**
 * The type of the React {@code Component} props of
 * {@link StartTranscribingDialog}.
 */
type Props = {

    /**
     * The {@code JitsiConference} for the current conference.
     */
    _conference: Object,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function,

    /**
     * Invoked to active other features of the app.
     */
    dispatch: Function
};

/**
 * React Component for getting confirmation to start a file recording session.
 *
 * @extends Component
 */
class StartTranscribingDialog extends Component<Props> {
    /**
     * Initializes a new {@code StartTranscribing} instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handler so it is only bound once for every instance.
        this._onSubmit = this._onSubmit.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Dialog
                okTitleKey = 'dialog.confirm'
                onSubmit = { this._onSubmit }
                titleKey = 'dialog.transcribing'
                width = 'small'>
                { this.props.t('transcribing.startTranscribingBody') }
            </Dialog>
        );
    }

    _onSubmit: () => boolean;

    /**
     * Starts a file recording session.
     *
     * @private
     * @returns {boolean} - True (to note that the modal should be closed).
     */
    _onSubmit() {
        this.props.dispatch(dialTranscriber());

        return true;
    }
}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code StartRecordingDialog} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _conference: JitsiConference
 * }}
 */
function _mapStateToProps(state) {
    return {
        _conference: state['features/base/conference'].conference
    };
}

export default translate(connect(_mapStateToProps)(StartTranscribingDialog));
