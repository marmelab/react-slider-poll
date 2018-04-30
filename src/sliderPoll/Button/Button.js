import React, { Component } from 'react';
import PropTypes from 'prop-types';

import glamorous from 'glamorous';
import classnames from 'classnames';

import { colors, transition } from '../util';

const hoverStyle = {
    backgroundColor: colors.yellow,
    borderColor: colors.black,
    color: colors.black,
};

const ButtonContainer = glamorous.span(
    {
        border: `1px solid ${colors.grey}`,
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: colors.black,
        color: colors.grey,
        transition: transition(0.5),
        outline: 'none',
        '.primary': {
            borderColor: colors.yellow,
            color: colors.yellow,
            ':hover': hoverStyle,
        },
        '.active': {
            boxShadow: `inset 0 0 0 3px ${colors.black}`,
        },
        ':hover': hoverStyle,
        '.selected': hoverStyle,
        '.disabled': {
            opacity: 0,
        },
    },
    {
        shouldClassNameUpdate: () => false,
    }
);

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
            .isRequired,
        onClick: PropTypes.func.isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        primary: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        primary: false,
        selected: false,
        disabled: false,
    };

    state = {
        active: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.active && !prevState.active) {
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('touchend', this.handleMouseUp);
        } else if (!this.state.active && prevState.active) {
            document.removeEventListener('mouseup', this.handleMouseUp);
            document.removeEventListener('touchend', this.handleMouseUp);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchend', this.handleMouseUp);
    }

    handleMouseDown = () => {
        const { disabled } = this.props;

        if (!disabled) {
            this.setState({ active: true });
        }
    };

    handleMouseUp = () => {
        this.setState({ active: false });
    };

    handleOnClick = event => {
        const { disabled, onClick } = this.props;
        if (!disabled) {
            setTimeout(() => onClick(event), 1000);
        }
    };

    render() {
        const {
            children,
            primary,
            disabled,
            selected,
            className,
            ...rest
        } = this.props;
        const { active } = this.state;
        return (
            <ButtonContainer
                className={classnames(className, {
                    primary,
                    active,
                    disabled,
                    selected,
                })}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleMouseDown}
                onClick={this.handleOnClick}
                role="button"
                tabindex="0"
                {...rest}
            >
                {children}
            </ButtonContainer>
        );
    }
}
