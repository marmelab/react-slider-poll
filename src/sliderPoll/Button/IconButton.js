import React, { Component } from 'react';
import PropTypes from 'prop-types';

import glamorous from 'glamorous';
import classnames from 'classnames';

import { mediaQueries, transition, rgba } from '../util';

const IconButtonContainer = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'none',
    transition: `
        ${transition(1, 'background-color')},
        transform 200ms cubic-bezier(0.23, 1, 0.32, 1)
    `,
    transform: 'translateZ(0)',
    borderRadius: 20,
    // With this, the div isn't centered anymore
    // but the icon is visually centered
    paddingBottom: 2,
    width: 40,
    height: 40,
    cursor: 'pointer',
    [mediaQueries.tablet]: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    ':hover': {
        backgroundColor: `${rgba.yellow(0.33)}`,
    },
    '.active': {
        backgroundColor: `${rgba.yellow(0.33)}`,
        transform: 'scale(0.92)',
    },
});

export default class IconButton extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    state = {
        active: false,
    };

    handleMouseDown = () => {
        this.setState({ active: true });
    };

    handleMouseUp = () => {
        // without this timeout, touchpad "taps" trigger mouse down and up too
        // fast and won't let the animation show
        setTimeout(() => {
            this.setState({ active: false });
        }, 50);
    };

    render() {
        const { children, onClick } = this.props;
        const { active } = this.state;
        return (
            <IconButtonContainer
                className={classnames({ active })}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onClick={onClick}
            >
                {children}
            </IconButtonContainer>
        );
    }
}
