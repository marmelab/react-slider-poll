import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'glamor';

import Button from './Button';

const actionButtonStyle = css({
    alignItems: 'center',
    borderRadius: 18,
    display: 'flex',
    justifyContent: 'center',
    padding: '9px 15px',
    margin: '0 30px',
    minWidth: 80,
});

const ActionButton = ({ children, onClick, ...rest }) => (
    <Button {...rest} onClick={onClick} className={`${actionButtonStyle}`}>
        {children}
    </Button>
);

ActionButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
        .isRequired,
    onClick: PropTypes.func,
};

ActionButton.defaultProps = {
    onClick: () => {},
};

export default ActionButton;
