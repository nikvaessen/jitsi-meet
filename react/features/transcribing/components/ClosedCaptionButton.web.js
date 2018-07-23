// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { createToolbarEvent, sendAnalytics } from '../../analytics';
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
     * Whether or not {@code ClosedCaptionButton} is toggled on or off.
     */
    isShowingCaptions: boolean
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
            isShowingCaptions: false
        };

        // Bind event handlers so they are only bound once for every instance.
        this._onToggleButton = this._onToggleButton.bind(this);
    }

    /**
     * Update dial-in numbers {@code InfoDialog}.
     *
     * @inheritdoc
     */
    componentDidMount() {
        // do nothing
    }

    /**
     * Update the visibility of the {@code InfoDialog}.
     *
     * @inheritdoc
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            // do nothing
        }
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { t } = this.props;
        const { isShowingCaptions } = this.state;
        const iconClass = `icon-cc ${isShowingCaptions ? '-toggled' : ''}`;

        return (
            <ToolbarButton
                accessibilityLabel = { t('cc.accessibilityLabel') }
                iconName = { iconClass }
                onClick = { this._onToggleButton }
                tooltip = { t('cc.tooltip') } />
        );
    }

    /**
     * Idk.
     * @private
     */
    _onToggleButton() {
        console.log('idk what happened');
    }

}

/**
 * Maps (parts of) the Redux state to the associated {@code InfoDialogButton}
 * component's props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *
 * }}
 */
function _mapStateToProps(state) {
    if (state) {
        // do nothing
    }

    return {

    };
}

export default translate(connect(_mapStateToProps)(ClosedCaptionButton));
