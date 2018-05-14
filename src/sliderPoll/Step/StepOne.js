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
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];

class StepOne extends PureComponent {
    render() {
        const {
            isDismissed,
            useReactAdmin,
            handleUseReactAdminChange,
        } = this.props;
        return (
            <Container>
                <DismissedContainer isDismissed={isDismissed}>
                    <StepNumber>Step 1</StepNumber>
                </DismissedContainer>
                <Question>Have you already used React Admin?</Question>
                <DismissedContainer isDismissed={isDismissed}>
                    <SwitchContainer>
                        <RoundSwitch
                            options={options}
                            value={useReactAdmin}
                            onChange={handleUseReactAdminChange}
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
    handleUseReactAdminChange: PropTypes.func,
    useReactAdmin: PropTypes.bool,
};

StepOne.defaultProps = {
    isDismissed: false,
    useReactAdmin: null,
    handleUseReactAdminChange: () => {},
};

export default StepOne;
