import React, { useState } from 'react';
import CheckBox from './CheckBox';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';

export default {
    title: 'components|CheckBox',
    component: CheckBox,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const checkbox = () => {
    const label = text('label', 'test-label');
    const disabled = boolean('disabled', true);
    const circle = boolean('circle', true);

    const [checked, setChecked] = useState(false);
    const onClick = () => {
        setChecked(!checked);
    }
    return (
        <CheckBox
            checked={checked}
            onClick={onClick}
            label={label}
            disabled={disabled}
            circle={circle}
        />
    );
};

checkbox.story = {
    name: 'Default'
};