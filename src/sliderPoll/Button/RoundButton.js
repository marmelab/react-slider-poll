import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'glamor';
import Button from './Button';

const roundButtonStyle = css({
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    margin: '5%',
    padding: 15,
    textAlign: 'center',
    '&::after': {
        content: `''`,
        display: 'table',
        paddingBottom: '100%',
    },
});

const RoundButton = ({ children, ...rest }) => (
    <Button {...rest} className={`${roundButtonStyle}`}>
        {children}
    </Button>
);

RoundButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
        .isRequired,
};

export default RoundButton;
