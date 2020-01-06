import React, { useState } from 'react';
import DropdownMulti from './DropdownMulti';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
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
    const error = boolean('error', false);
    const require = boolean('require', true);
    const disabled = boolean('disabled', false);
    const placeholder = text('placeholder', "placeholder");
    const [testValue, setTestValue] = useState([]); 
    return (
        <DropdownMulti
            onChange={(name, value) => { setTestValue(value) }}
            value={testValue}
            name="unknown"
            placeholder={placeholder}
            options={[
                { key: 0, value: 'ab', text: 'ab text' },
                { key: 1, value: 'cd', text: 'cd cd' },
                { key: 2, value: 'df', text: 'df text' }
            ]}
            message={["error1", "errpr2"]}
            label={label}
            require={require}
            search={search}
            disabled={disabled}
            errorMessages={['hello']}
        />
    );
};

dropdownMulti.story = {
    name: 'Default'
};