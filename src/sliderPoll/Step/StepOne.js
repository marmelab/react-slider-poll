import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { RoundSwitch } from '../Button';
import Question from './Question';
import DismissedContainer from './DismissedContainer';
import StepNumber from './StepNumber';
import { transition } from '../util';

const Container = glamorous.div({
    margin: '0.2em',
    textAlign: 'center',
});

const SwitchContainer = glamorous.div(
    {
        margin: 'auto',
        minWidth: 250,
        transition: transition(),
        transform: 'translateZ(0)',
        width: 250,
    },
    {
        shouldClassNameUpdate: () => false,
    }
);

const options = [
    {
        label: 'Like',
        value: 'LIKE',
    },
    {
        label: 'Dislike',
        value: 'DISLIKE',
    },
];

class StepOne extends PureComponent {
    render() {
        const { isDismissed, like, handleLikeChange } = this.props;
        return (
            <Container>
                <DismissedContainer isDismissed={isDismissed}>
                    <StepNumber>Step 1</StepNumber>
                </DismissedContainer>
                <Question>Do you like my code ?</Question>
                <DismissedContainer isDismissed={isDismissed}>
                    <SwitchContainer>
                        <RoundSwitch
                            options={options}
                            value={like}
                            onChange={handleLikeChange}
                            primary
                        />
                    </SwitchContainer>
                </DismissedContainer>
            </Container>
        );
    }
}

StepOne.propTypes = {
    isDismissed: PropTypes.bool,
    handleLikeChange: PropTypes.func,
    like: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

StepOne.defaultProps = {
    isDismissed: false,
    like: null,
    handleLikeChange: () => {},
};

export default StepOne;
