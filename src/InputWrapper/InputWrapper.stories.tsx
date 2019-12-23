import React, { useState } from 'react';
import InputWrapper from './InputWrapper';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
    title: 'components|InputWrapper',
    component: InputWrapper,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const inputWrapper = () => {
    return (
        <InputWrapper
            label="label"
            required
            messages={['error1', 'error2', 'error3', 'error4']}
            error
        >
            <input type="text"/>
        </InputWrapper>
    );
};

inputWrapper.story = {
    name: 'Default'
};