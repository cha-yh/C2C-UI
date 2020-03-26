import React, { useState } from 'react';
import Textarea from './Textarea';
import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs';
import { Box } from '../storyStyle';

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
    const required = boolean('required', true);
    const label = text('label', 'label');
    const height = text('height', '6.25rem');
    const messages = array('messages', []);
    const errorMessages = array('errorMessages', []);
    return (
        <Textarea
            label={label}
            required={required}
            height={height}
            messages={messages}
            errorMessages={errorMessages}
        />
    );
};
export const options = () => {
  return (
    <Box>
        <h5>with Label & required</h5>
        <Textarea
            label="label1"
        />
        <Textarea
            label="label+required"
            required
        />

        <h5>with messages & error messages</h5>
        <Textarea
            label="with messages"
            messages={["message1", "message2"]}
        />
        <Textarea
            label="with error message(when focus out, shown)"
            errorMessages={["error1", "error2"]}
        />

        <h5>height</h5>
        <Textarea
            label="height='5rem'"
            height='5rem'
        />
        <Textarea
            label="height='6rem'"
            height='6rem'
        />
        <Textarea
            label="height='7rem'"
            height='7rem'
        />

        <h5>placeholder & disabled</h5>
        <Textarea
            placeholder="hello input"
        />
        <Textarea
            disabled
            value="value"
        />
        <Textarea
            disabled
            placeholder="hello input"
        />
    </Box>
  )
}

textarea.story = {
    name: 'Default'
};