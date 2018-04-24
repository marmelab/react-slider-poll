import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { mediaQueries } from '../util';

import Button from './Button';

const squareOptionStyle = css({
    display: 'block',
    padding: 15,
    maxWidth: 250,
    textAlign: 'center',
    width: '100%',
    [mediaQueries.phablet]: {
        padding: '15px 20px',
    },
});

const SquareOption = ({ children, ...rest }) => (
    <Button {...rest} className={`${squareOptionStyle}`}>
        {children}
    </Button>
);

SquareOption.propTypes = {
    children: PropTypes.element.isRequired,
};

export default SquareOption;
