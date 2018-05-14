import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { mediaQueries } from '../util';
import Question from './Question';
import DismissedContainer from './DismissedContainer';
import { SquareSelect } from '../Button';
import StepNumber from './StepNumber';

const Container = glamorous.div(
    {
        margin: '0.2em',
        textAlign: 'center',
    },
    {
        shouldClassNameUpdate: () => false,
    }
);

export const options = [
    {
        label: 'Very confident',
        value: 5,
    },
    {
        label: 'Moderately confident',
        value: 4,
    },
    {
        label: 'Somewhat confident',
        value: 3,
    },
    {
        label: 'Only slightly confident',
        value: 2,
    },
    {
        label: 'Not confident at all',
        value: 1,
    },
];

const squareSelectHeight = 50;

const SelectContainer = glamorous.div(
    {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: options.length * (squareSelectHeight + 5),
        justifyContent: 'space-between',
        maxHeight: 500,
        [mediaQueries.tablet]: {
            height: options.length * (squareSelectHeight + 5 + 2), // Padding and border
        },
    },
    {
        shouldClassNameUpdate: () => false,
    }
);

class StepTwo extends PureComponent {
    static propTypes = {
        isDismissed: PropTypes.bool,
        feeling: PropTypes.number,
        handleFeelingChange: PropTypes.func,
    };

    static defaultProps = {
        isDismissed: false,
        feeling: null,
        handleFeelingChange: () => {},
    };

    render() {
        const { isDismissed, feeling, handleFeelingChange } = this.props;
        return (
            <Container>
                <DismissedContainer isDismissed={isDismissed}>
                    <StepNumber>Step 2</StepNumber>
                </DismissedContainer>
                <Question>How confident do you feel about using it?</Question>
                <DismissedContainer isDismissed={isDismissed}>
                    <SelectContainer>
                        <SquareSelect
                            options={options}
                            value={feeling}
                            onChange={handleFeelingChange}
                        />
                    </SelectContainer>
                </DismissedContainer>
            </Container>
        );
    }
}

export default StepTwo;
