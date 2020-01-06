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
    const disabled = boolean('disabled', false);
    const circle = boolean('circle', false);

    const [checked, setChecked] = useState(false);
    const onClick = () => {
        setChecked(!checked);
    }
    return (
        <React.Fragment>
            <CheckBox
                checked={checked}
                onClick={onClick}
                label={"Check box"}
            />

            <CheckBox
                checked={checked}
                onClick={onClick}
                label={label}
                disabled={disabled}
                circle={circle}
            />
        </React.Fragment>

        
    );
};

checkbox.story = {
    name: 'Default'
};