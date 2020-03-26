import React from 'react';
import Label from './Label';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
    title: 'components|Label',
    component: Label,
    parameters: {
    docs: {
        inlineStories: false
    }
    },
    decorators: [withKnobs]
};

export const label = () => {

    return (
        <>
            <Label
                text="label"
            />
            <Label
                text="label+required"
                required
            />
           
        </>
    );
};

label.story = {
    name: 'Default'
};