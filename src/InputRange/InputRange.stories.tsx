import React, { useState } from 'react';
import InputRange from './InputRange';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Box } from '../storyStyle';
import { MdClose, MdAcUnit } from 'react-icons/md';

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
    const handleChange = (name:any, value:any) => {
        setValue(value);
    }
    const disabled = boolean('disabled', false);
    const required = boolean('required', false);
    
    const symbol = text('symbol', "");
    const placeholder = text('placeholder', "");
    const label = text('label', "");

    const width = number('width', 700);

    return (
        <div>
            <InputRange
                value={value}
                name="test"
                onChange={handleChange}
                disabled={disabled}
                symbol={symbol}
                label={label}
                placeholder={placeholder}
                required={required}
                width={width}
            />
        </div>
    );
};

export const options = () => {
    return (
        <Box>
            <h5>with label</h5>
            <InputRange
                name="test"
                value=""
                label={'label'}
                required={false}
            />
            <InputRange
                name="test"
                value=""
                label={'label+required'}
                required={true}
            />
            <h5>with icon&symbol</h5>
            <InputRange
                name="test"
                value=""
                label="with Icon"
                icon={<MdAcUnit/>}
            />
            <InputRange
                name="test"
                value=""
                symbol="km/h"
                label="with Symbol"
            />
            <InputRange
                name="test"
                value=""
                label="with Icon & Symbol"
                icon={<MdAcUnit/>}
                symbol="km/h"
            />

            <h5>with message & errorMessage</h5>
            <InputRange
                name="test"
                value=""
                label="with message"
                messages={['message1, message2']}
            />
            <InputRange
                name="test"
                value=""
                label="with error message(when focus out, shown)"
                errorMessages={['error message1, error message2']}
            />

            <h5>width</h5>
            <InputRange
                name="test"
                value=""
                label="width={500}"
                width={500}
            />
            <InputRange
                name="test"
                value=""
                label="width={600}"
                width={600}
            />
            <InputRange
                name="test"
                value=""
                label="width={700}"
                width={700}
            />

            <h5>placeholder & disabled</h5>
            <InputRange
                name="test"
                value=""
                label="with placeholder"
                width={700}
                placeholder="placeholder"
            />
            <InputRange
                name="test"
                value=""
                label="with disabled"
                width={700}
                disabled
            />
            <InputRange
                name="test"
                value=""
                label="with placeholder & disabled"
                width={700}
                placeholder="placeholder"
                disabled
            />
        </Box>
    )
}

inputWrapper.story = {
    name: 'Default'
};