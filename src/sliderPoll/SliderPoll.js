import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Arrow from './Arrow';
import IconButton from './IconButton';
import { colors } from './util';

export const Container = glamorous.div(
    {
        backgroundColor: colors.black,
        color: colors.grey,
        fontFamily: "'MuseoSans-300', sans-serif",
        margin: '0 auto',
        padding: '1%',
        userSelect: 'none',
    },
    ({ isDismissed }) => (isDismissed ? { cursor: 'pointer' } : {}),
);

const ButtonsContainer = glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '1%',
    position: 'absolute',
    right: 0,
    top: 0,
});

const exampleStyle = {
    height: '380px',
};

class SliderPoll extends Component {
    constructor(props) {
        super(props);

        const step = 1;
        this.state = {
            ...this.state,
            ...props.poll,
            step,
        };
    }

    state = {
        step: 1,
        like: null,
    };

    render() {
        const { handleDismiss, handleReopen, isDismissed } = this.props;
        const { step, like } = this.state;

        return (
            <Container
                onClick={isDismissed && handleReopen}
                isDismissed={isDismissed}
            >
                <div style={exampleStyle}>Example text</div>
                <ButtonsContainer>
                    <IconButton
                        onClick={isDismissed ? handleReopen : handleDismiss}
                    >
                        <Arrow isUp={isDismissed} highlighted={isDismissed} />
                    </IconButton>
                </ButtonsContainer>
            </Container>
        );
    }
}

SliderPoll.propTypes = {
    handleDismiss: PropTypes.func,
    handleFinish: PropTypes.func,
    handleReopen: PropTypes.func,
    handleSaveStep: PropTypes.func,
    isDismissed: PropTypes.bool,
    poll: PropTypes.shape({
        like: PropTypes.bool,
    }),
};

SliderPoll.defaultProps = {
    handleDismiss: () => {},
    handleFinish: () => Promise.resolve(),
    handleReopen: () => {},
    handleSaveStep: () => Promise.resolve(),
    isDismissed: false,
    poll: {},
};

export default SliderPoll;
