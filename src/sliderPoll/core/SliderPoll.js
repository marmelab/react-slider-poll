import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { IconButton, Arrow } from '../Button';
import { Carousel } from '../Carousel';
import { colors } from '../util';

export const Container = glamorous.div(
    {
        backgroundColor: colors.black,
        color: colors.grey,
        fontFamily: "'MuseoSans-300', sans-serif",
        margin: '0 auto',
        padding: '1%',
        userSelect: 'none',
    },
    ({ isDismissed }) => (isDismissed ? { cursor: 'pointer' } : {})
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

    shouldAllowNextStep = () => {
        return true;
    };

    shouldAllowSkipStep = () => {
        return false;
    };

    handleStepChange = step => {
        const promise = this.props.handleSaveStep(this.state);

        if (step > 2) {
            promise.then(this.props.handleFinish);
            return promise;
        }
        this.setState({ step });
        return promise;
    };

    render() {
        const { handleDismiss, handleReopen, isDismissed } = this.props;
        const { step } = this.state;

        const allowNextStep = this.shouldAllowNextStep();
        const stepSkippable = this.shouldAllowSkipStep();

        return (
            <Container
                onClick={isDismissed && handleReopen}
                isDismissed={isDismissed}
            >
                <Carousel
                    step={step}
                    handleStepChange={this.handleStepChange}
                    nextStepAllowed={allowNextStep}
                    stepSkippable={stepSkippable}
                    showPagination={!isDismissed}
                >
                    <div>111111111111111</div>
                    <div>222222222222222</div>
                </Carousel>
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
