import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import glamorous from 'glamorous';

import { ActionButton } from '../Button';
import { transition, colors, mediaQueries } from '../util';

const PaginationContainer = glamorous.div(
    {
        alignItems: 'center',
        display: 'flex',
        height: 40,
        margin: '0.5em',
        transition: transition(0.5),
        transform: 'translateZ(0)',
        justifyContent: 'center',
        '.hidden': {
            height: 0,
            overflow: 'hidden',
        },
        [mediaQueries.tablet]: {
            height: 50,
            margin: '1em',
        },
    },
    {
        shouldClassNameUpdate: () => false,
    },
);

const circleSize = 12;
export const Circle = glamorous.span(
    {
        backgroundColor: colors.grey,
        borderRadius: circleSize / 2,
        height: circleSize,
        margin: 4,
        minHeight: circleSize,
        minWidth: circleSize,
        transition: transition(0.5, 'background-color'),
        transform: 'translateZ(0)',
        width: circleSize,
        '.active': {
            backgroundColor: colors.yellow,
        },
    },
    {
        shouldClassNameUpdate: () => false,
    },
);

class Pagination extends PureComponent {
    static propTypes = {
        handleClickPrevious: PropTypes.func,
        step: PropTypes.number,
        showPagination: PropTypes.bool,
        nbSteps: PropTypes.number,
        handleClickNext: PropTypes.func,
        stepSkippable: PropTypes.bool,
        nextStepAllowed: PropTypes.bool,
        nextButtonContent: PropTypes.string,
        isLastStep: PropTypes.bool,
    };

    static defaultProps = {
        step: 1,
        handleClickPrevious: () => {},
        handleClickNext: () => {},
        stepSkippable: false,
        nextStepAllowed: true,
        showPagination: true,
        nextButtonContent: 'Next',
        isLastStep: false,
        nbSteps: '2',
    };

    render() {
        const {
            handleClickPrevious,
            step,
            showPagination,
            nbSteps,
            handleClickNext,
            stepSkippable,
            nextStepAllowed,
            nextButtonContent,
            isLastStep,
        } = this.props;
        return (
            <PaginationContainer
                className={classnames({ hidden: !showPagination })}
            >
                <ActionButton
                    onClick={() => handleClickPrevious(step === 1)}
                    disabled={step === 1}
                >
                    <span>Back</span>
                </ActionButton>
                {Array.from(Array(nbSteps).keys()).map(i => (
                    <Circle
                        key={i}
                        className={classnames({
                            active: step === i + 1,
                        })}
                    />
                ))}
                <ActionButton
                    onClick={() => handleClickNext(isLastStep)}
                    disabled={!stepSkippable && !nextStepAllowed}
                    primary
                >
                    <span>{nextButtonContent}</span>
                </ActionButton>
            </PaginationContainer>
        );
    }
}

export default Pagination;
