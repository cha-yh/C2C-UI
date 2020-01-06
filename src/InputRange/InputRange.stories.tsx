import React, { useState } from 'react';
import InputRange from './InputRange';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
    title: 'components|InputRange',
    component: InputRange,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const inputWrapper = () => {
    const [value, setValue] = useState("");
    const handleChange = (name, value) => {
        setValue(value);
    }
    const disabled = boolean('disabled', false);
    const symbol = text('symbol', "");

    return (
        <div>
            <InputRange
                value={value}
                name="test"
                onChange={handleChange}
                disabled={disabled}
                symbol={symbol}
                label="label"
                placeholder="placeholder"
                require
                // width={500}
                message={[
                    "1. Fatal Error",
                    "2. NOT_FOUND"
                ]}
            />

            <InputRange
                value={value}
                name="test"
                onChange={handleChange}
                disabled={disabled}
                symbol={symbol}
                label="label"
                placeholder="placeholder"
                require
                width={500}
                errorMessages={['error1', 'error2']}
            />
        </div>
    );
};

inputWrapper.story = {
    name: 'Default'
};