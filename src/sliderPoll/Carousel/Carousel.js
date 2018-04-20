import React, { Children } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { mediaQueries, transition } from '../util';

import Pagination from './Pagination';

const Container = glamorous.div({
    overflow: 'hidden',
});

const CarouselContainer = glamorous.div(
    {
        position: 'relative',
        margin: 0,
        padding: 0,
        transition: transition(0.5),
        transform: 'translateZ(0)',
        overflow: 'hidden',
    },
    ({ step, height, numberOfSteps }) =>
        Object.assign({}, height, {
            width: `${numberOfSteps * 100}%`,
            marginLeft: `-${(step - 1) * 100}%`,
        })
);

export const StepContainer = glamorous.div(
    {
        position: 'absolute',
        transition: transition(0.5),
        transform: 'translateZ(0)',
    },
    ({ step, numberOfSteps }) => ({
        left: `${100 / numberOfSteps * step}%`,
        width: `${100 / numberOfSteps}%`,
    }),
    {
        shouldClassNameUpdate: (prevProps, nextProps) =>
            prevProps.step !== nextProps.step ||
            prevProps.numberOfSteps !== nextProps.numberOfSteps,
    }
);

const computeButtonLabel = (isLastStep, nextStepAllowed, stepSkippable) => {
    if (isLastStep && nextStepAllowed) {
        return 'Done';
    }
    if (nextStepAllowed) {
        return 'Next';
    }
    if (stepSkippable) {
        return 'Skip';
    }
    return '';
};

const stepHeights = [
    {
        height: 360,
        [mediaQueries.tablet]: {
            height: 380,
        },
    },
    {
        height: 380,
        [mediaQueries.tablet]: {
            height: 420,
        },
    },
];

export default class Carousel extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]).isRequired,
        step: PropTypes.number,
        handleStepChange: PropTypes.func,
        nextStepAllowed: PropTypes.bool,
        showPagination: PropTypes.bool,
        stepSkippable: PropTypes.bool,
    };

    static defaultProps = {
        step: 1,
        handleStepChange: () => {},
        nextStepAllowed: true,
        showPagination: true,
        stepSkippable: false,
    };

    handleClickPrevious = isFirstStep => {
        const { handleStepChange, step } = this.props;
        if (!isFirstStep) {
            handleStepChange(step - 1);
        }
    };

    handleClickNext = () => {
        const {
            handleStepChange,
            step,
            nextStepAllowed,
            stepSkippable,
        } = this.props;
        if (stepSkippable || nextStepAllowed) {
            handleStepChange(step + 1);
        }
    };

    render() {
        const {
            children,
            step,
            nextStepAllowed,
            stepSkippable,
            showPagination,
        } = this.props;
        const height = stepHeights[step - 1];
        const isLastStep = step === children.length;
        const nextButtonContent = computeButtonLabel(
            isLastStep,
            nextStepAllowed,
            stepSkippable
        );

        return (
            <Container>
                <CarouselContainer
                    step={step}
                    height={height}
                    numberOfSteps={children.length}
                >
                    {Children.map(children, (child, index) => (
                        <StepContainer
                            key={index}
                            numberOfSteps={children.length}
                            step={index}
                        >
                            {child}
                        </StepContainer>
                    ))}
                </CarouselContainer>
                <Pagination
                    handleClickPrevious={this.handleClickPrevious}
                    step={step}
                    showPagination={showPagination}
                    nbSteps={children.length}
                    handleClickNext={this.handleClickNext}
                    stepSkippable={stepSkippable}
                    nextStepAllowed={nextStepAllowed}
                    nextButtonContent={nextButtonContent}
                    isLastStep={isLastStep}
                />
            </Container>
        );
    }
}
