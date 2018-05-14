import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RoundButton from './RoundButton';

const Container = glamorous.div(
    {
        display: 'flex',
        justifyContent: 'flex-between',
    },
    {
        shouldClassNameUpdate: () => false,
    }
);

export default class RoundSwitch extends PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.any,
            })
        ),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
        onChange: PropTypes.func.isRequired,
        primary: PropTypes.bool,
    };

    static defaultProps = {
        options: [],
        value: null,
        primary: false,
    };

    render() {
        const { options, onChange, value, primary } = this.props;

        return (
            <Container>
                {options.map(option => (
                    <RoundButton
                        key={option.value}
                        selected={option.value === value}
                        onClick={() => onChange(option.value)}
                        primary={primary}
                    >
                        <span>{option.label}</span>
                    </RoundButton>
                ))}
            </Container>
        );
    }
}
