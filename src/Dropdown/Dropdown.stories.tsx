import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';

export default {
    title: 'components|Dropdown',
    component: Dropdown,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const dropdown = () => {
    const label = text('label', 'test-label');
    const search = boolean('search', true);
    const require = boolean('require', true);
    const disabled = boolean('disabled', false);
    const placeholder = text('placeholder', "placeholder");
    const [testValue, setTestValue] = useState("");
    const message = array('message', []);
    const errorMessages = array('errorMessages', []);
    const width = text('width', '500px');
    return (
        <Dropdown
            onChange={(name, value) => { setTestValue(String(value)) }}
            value={testValue}
            name="unknown"
            placeholder={placeholder}
            options={[
                { key: 0, value: 'first', text: 'first option' },
                { key: 1, value: 'second', text: 'second option' }
            ]}
            message={message}
            label={label}
            require={require}
            search={search}
            disabled={disabled}
            errorMessages={errorMessages}
            width={width}
        />
    );
};

export const withMessages = () => {
    return (
        <Dropdown
            onChange={() => {}}
            value={""}
            name="withMessages"
            options={[
                { key: 0, value: 'ab', text: 'first option' },
                { key: 1, value: 'cd', text: 'second option' }
            ]}
            message={['message1', 'message2']}
        />
    )
}

export const withLabel = () => {
    return (
        <>
        <p>label="label" require={`false`}</p>
        <Dropdown
            onChange={() => {}}
            value={""}
            name="withMessages"
            options={[
                { key: 0, value: 'ab', text: 'first option' },
                { key: 1, value: 'cd', text: 'second option' }
            ]}
            label="label"
        />

        <p>label="label" require={`true`}</p>
        <Dropdown
            onChange={() => {}}
            value={""}
            name="withMessages"
            options={[
                { key: 0, value: 'ab', text: 'first option' },
                { key: 1, value: 'cd', text: 'second option' }
            ]}
            label="label"
            require
        />
        </>
    )
}

export const withErrorMessages = () => {
    return (
        <>
            <p>When the focus of Dropdown component is out, it will be shown</p>
            <p>{`errorMessages={['error1', 'error2']}`}</p>
            <Dropdown
                onChange={() => {}}
                value={""}
                name="withMessages"
                options={[
                    { key: 0, value: 'ab', text: 'first option' },
                    { key: 1, value: 'cd', text: 'second option' }
                ]}
                errorMessages={['error1', 'error2']}
            />
        </>
    )
}

export const disabled = () => {
    return (
        <>
            <p>{`disabled`}</p>
            <Dropdown
                onChange={() => {}}
                value={""}
                name="withMessages"
                options={[
                    { key: 0, value: 'ab', text: 'first option' },
                    { key: 1, value: 'cd', text: 'second option' }
                ]}
                disabled
            />
        </>
    )
}

export const width = () => {
    return (
        <>
            <p>{`width='80px'`}</p>
            <Dropdown
                onChange={() => {}}
                value={""}
                name="withMessages"
                options={[
                    { key: 0, value: 'ab', text: 'first option' },
                    { key: 1, value: 'cd', text: 'second option' }
                ]}
                width='80px'
            />

            <p>{`width='120px'`}</p>
            <Dropdown
                onChange={() => {}}
                value={""}
                name="withMessages"
                options={[
                    { key: 0, value: 'ab', text: 'first option' },
                    { key: 1, value: 'cd', text: 'second option' }
                ]}
                width='120px'
            />

            <p>{`width='160'`}</p>
            <Dropdown
                onChange={() => {}}
                value={""}
                name="withMessages"
                options={[
                    { key: 0, value: 'ab', text: 'first option' },
                    { key: 1, value: 'cd', text: 'second option' }
                ]}
                width='160'
            />
        </>
    )
}

dropdown.story = {
    name: 'Default'
};