import React, { useState } from 'react';
import DropdownMulti from './DropdownMulti';
import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';

export default {
    title: 'components|DropdownMulti',
    component: DropdownMulti,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const dropdownMulti = () => {
    const label = text('label', 'test-label');
    const search = boolean('search', true);
    const required = boolean('required', true);
    const disabled = boolean('disabled', false);
    const placeholder = text('placeholder', "");
    const width = number('width', 500);
    const errorMessages = array('errorMessages', []);
    const messages = array('messages', []);
    const [testValue, setTestValue] = useState([]); 
    return (
        <div>
            <DropdownMulti
                onChange={(name:any, value:any) => { setTestValue(value) }}
                value={testValue}
                name="unknown1"
                placeholder={placeholder}
                options={[
                    { key: 0, value: 'value1', text: 'text1' },
                    { key: 1, value: 'value2', text: 'text2' },
                    { key: 2, value: 'value3', text: 'text3' }
                ]}
                label={label}
                required={required}
                search={search}
                disabled={disabled}
                width={width}
                errorMessages={errorMessages}
                messages={messages}
            />
        </div>
    );
};

dropdownMulti.story = {
    name: 'Default'
};