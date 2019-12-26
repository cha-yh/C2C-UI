import React, { useState } from 'react';
import Textarea from './Textarea';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
    title: 'components|Textarea',
    component: Textarea,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const textarea = () => {
    return (
        <Textarea
            label="label"
            require
            message={['error1', 'error2', 'error3', 'error4']}
            error
        />
    );
};

textarea.story = {
    name: 'Default'
};