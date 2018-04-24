import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SquareOption from './SquareOption';

const SquareSelect = ({ options, value, onChange }) => (
    <Fragment>
        {options.map(option => (
            <SquareOption
                key={option.value}
                selected={value === option.value}
                onClick={() => onChange(option.value)}
                primary
            >
                <span>{option.label}</span>
            </SquareOption>
        ))}
    </Fragment>
);

SquareSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

SquareSelect.defaultProps = {
    value: null,
    onChange: () => {},
};

export default SquareSelect;
