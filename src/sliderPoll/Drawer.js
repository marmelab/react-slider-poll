import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { transition, mediaQueries } from './util';

export const POSITION_OPEN = 'open';
export const POSITION_DISMISSED = 'dismissed';
export const POSITION_CLOSED = 'closed';

const DrawerContainer = glamorous.div({
    bottom: 0,
    left: 0,
    margin: '0 auto',
    position: 'fixed',
    right: 0,
    transition: transition(),
    transform: 'translateZ(0)',
    width: '100%',
    '.closed': {
        maxHeight: 0,
    },
    '.open': {
        maxHeight: '100%',
    },
    '.dismissed': {
        maxHeight: 70,
    },
    [mediaQueries.tablet]: {
        width: 500,
        '.dismissed': {
            maxHeight: 80,
        },
    },
});

class Drawer extends Component {
    static defaultProps = {
        delay: 3500,
        handleFinish: () => {},
        style: {},
        defaultPosition: POSITION_OPEN,
        onPositionChange: () => {},
    };

    static propTypes = {
        children: PropTypes.element.isRequired,
        delay: PropTypes.number,
        handleFinish: PropTypes.func,
        style: PropTypes.shape({}),
        defaultPosition: PropTypes.oneOf([
            POSITION_OPEN,
            POSITION_DISMISSED,
            POSITION_CLOSED,
        ]),
        onPositionChange: PropTypes.func,
    };

    /**
     * possible positions:
     *  - POSITION_OPEN
     *  - POSITION_DISMISSED
     *  - POSITION_CLOSED
     */
    state = {
        position: POSITION_CLOSED,
    };

    componentDidMount() {
        const { defaultPosition, delay, onPositionChange } = this.props;

        setTimeout(() => {
            this.setState({ position: defaultPosition });
            onPositionChange(defaultPosition);
        }, delay);
    }

    handleDismiss = e => {
        if (e) {
            e.preventDefault();
        }
        this.setState({ position: POSITION_DISMISSED });
        this.props.onPositionChange(POSITION_DISMISSED);
    };

    handleReopen = e => {
        if (e) {
            e.preventDefault();
        }
        this.setState({ position: POSITION_OPEN });
        this.props.onPositionChange(POSITION_OPEN);
    };

    handleFinish = e => {
        if (e) {
            e.preventDefault();
        }
        this.setState({ position: POSITION_CLOSED });
        this.props.onPositionChange(POSITION_CLOSED);
        this.props.handleFinish();
    };

    render() {
        const { children, style } = this.props;
        const { position } = this.state;

        return (
            <DrawerContainer
                className={classnames('slider', {
                    open: position === POSITION_OPEN,
                    dismissed: position === POSITION_DISMISSED,
                    closed: position === POSITION_CLOSED,
                })}
                css={style}
            >
                {React.cloneElement(children, {
                    handleDismiss: this.handleDismiss,
                    handleFinish: this.handleFinish,
                    handleReopen: this.handleReopen,
                    isDismissed: [POSITION_DISMISSED, POSITION_CLOSED].includes(
                        position
                    ),
                })}
            </DrawerContainer>
        );
    }
}

export default Drawer;
