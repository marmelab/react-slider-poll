import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { colors, mediaQueries, transition } from '../util';

const Container = glamorous.div({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    opacity: 1,
    transition: transition(1),
    '.hidden': {
        height: '0%',
        opacity: 0,
    },
});

const Content = glamorous.h2({
    color: colors.superlightgrey,
    fontSize: '1.1em',
    height: '100%',
    margin: '0.5em',
    padding: '0 15%',
    textAlign: 'center',
    transition: transition(1),
    '.hidden': {
        height: '0%',
        margin: 0,
    },
    [mediaQueries.tablet]: {
        fontSize: '1.2em',
        margin: '1em 15%',
        padding: 0,
    },
});

const Question = ({ children, hidden }) => (
    <Container className={classnames({ hidden })}>
        <Content className={classnames({ hidden })}>{children}</Content>
    </Container>
);

Question.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]).isRequired,
    hidden: PropTypes.bool,
};

Question.defaultProps = {
    hidden: false,
};

export default Question;
