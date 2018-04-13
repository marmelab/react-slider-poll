import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { transition, colors } from './util';

const ArrowContainer = glamorous.svg({
    transition: transition(),
    transform: 'rotate(0deg) translate3d(0,0,0)',
    stroke: colors.lightgrey,
    '.up': {
        transform: 'rotate(180deg) translate3d(0,0,0)',
    },
    '.highlighted': {
        stroke: colors.yellow,
    },
});

const Arrow = ({ isUp, highlighted }) => (
    <ArrowContainer
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classnames({
            up: isUp,
            highlighted,
        })}
    >
        <line x1="12" y1="4" x2="12" y2="20" />
        <polyline points="18 14 12 20 6 14" />
    </ArrowContainer>
);

Arrow.propTypes = {
    isUp: PropTypes.bool,
    highlighted: PropTypes.bool,
};

Arrow.defaultProps = {
    isUp: true,
    highlighted: false,
};

export default Arrow;
