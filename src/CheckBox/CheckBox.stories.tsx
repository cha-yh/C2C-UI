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
    const label = text('label', 'checkBoxLabel');
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
                label={label}
                disabled={disabled}
                circle={circle}
            />
        </React.Fragment>
    );
};

export const disabled = () => {
    return (
        <>
            <p>{`disabled={true} circle={true|false} checked={true|false}`}</p>
            <CheckBox
                checked={true}
                disabled={true}
                circle={false}
            />
            <CheckBox
                checked={false}
                disabled={true}
                circle={false}
            />
            <CheckBox
                checked={true}
                disabled={true}
                circle={true}
            />
            <CheckBox
                checked={false}
                disabled={true}
                circle={true}
            />
        </>
    )
}

export const labeld = () => {
    return (
        <>
            <p>{`label={CheckBox} circle={true|false} disabled={true|false} checked={true|false}`}</p>
            <CheckBox
                checked={true}
                disabled={true}
                circle={false}
                label="CheckBox"
            />
            <CheckBox
                checked={true}
                circle={false}
                label="CheckBox"
            />

            <CheckBox
                checked={false}
                disabled={true}
                circle={false}
                label="CheckBox"
            />
            <CheckBox
                checked={false}
                circle={false}
                label="CheckBox"
            />

            <CheckBox
                checked={true}
                disabled={true}
                circle={true}
                label="CheckBox"
            />
            <CheckBox
                checked={true}
                circle={true}
                label="CheckBox"
            />

            <CheckBox
                checked={false}
                disabled={true}
                circle={true}
                label="CheckBox"
            />
            <CheckBox
                checked={false}
                circle={true}
                label="CheckBox"
            />

        </>
    )
}

checkbox.story = {
    name: 'Default'
};