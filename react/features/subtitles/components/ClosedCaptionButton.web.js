// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createToolbarEvent, sendAnalytics } from '../../analytics';
import { translate } from '../../base/i18n';
import { ToolbarButton } from '../../toolbox';

/**
 * The type of the React {@code Component} props of {@link InfoDialogButton}.
 */
type Props = {

    /**
     * Invoked to toggle display of the info dialog.
     */
    dispatch: Dispatch<*>,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * The type of the React {@code Component} state of {@link InfoDialogButton}.
 */
type State = {

    /**
     * Whether or not {@code InfoDialog} should be visible.
     */
    isTranscribing: boolean
};

/**
 * A React Component for displaying a button which opens a dialog with
 * information about the conference and with ways to invite people.
 *
 * @extends Component
 */
class ClosedCaptionButton extends Component<Props, State> {

    /**
     * Initializes new {@code InfoDialogButton} instance.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        this.state = {
            isTranscribing: false
        };

        this._onButtonToggled = this._onButtonToggled.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { isTranscribing } = this.state;
        const iconClass = `icon-cc ${isTranscribing ? '-toggled' : ''}`;
        const { t } = this.props;

        return (
            <ToolbarButton
                accessibilityLabel = { t('info.accessibilityLabel') }
                iconName = { iconClass }
                onClick = { this._onButtonToggled }
                tooltip = { t('info.tooltip') } />

        );
    }

    _onButtonToggled() {
        console.log('clicked cc button');
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code InfoDialogButton}
 * component's props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 * }}
 */
function _mapStateToProps(state) {

    return {

    };
}

export default translate(connect(_mapStateToProps)(ClosedCaptionButton));
