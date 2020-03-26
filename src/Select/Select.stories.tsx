import React, { useState } from 'react';
import Select from './Select';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';

export default {
    title: 'components|Select',
    component: Select,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};
const options = [
    { key: 0, value: 'value1', text: 'text1' },
    { key: 1, value: 'value2', text: 'text2' },
    { key: 2, value: 'value3', text: 'text3' },
    { key: 3, value: 'value4', text: 'text4' },
    { key: 4, value: 'value5', text: 'text5' },
    { key: 5, value: 'value6', text: 'text6' },
    { key: 6, value: 'value7', text: 'text7' },
    { key: 7, value: 'value8', text: 'text8' }
];
export const select = () => {
    const [singleValue, setSingleValue] = useState<any>("value1"); 
    return (
        <Select
            name="singletest"
            onChange={(name, value) => { setSingleValue(value) }}
            value={singleValue}
            options={[
                { key: 'none', value: '', text: 'None' },
                ...options,
            ]}
        />
    )
}
export const singleAndMultipleInAForm = () => {
    const [testValue, setTestValue] = useState<any>([]);
    const [singleValue, setSingleValue] = useState<any>(""); 
    
    const submit = (e:any)=>{
        e.preventDefault();
        alert(
        `Submitted!\nmultiple select value: ${testValue.join(', ')}\nsingle select value: ${singleValue}`
        )
    }
    
    return (
        <form onSubmit={submit}>
            <div style={{display:'flex'}}>
                <Select
                    name="multipletest"
                    onChange={(name, value) => { setTestValue(value) }}
                    value={testValue}
                    options={options}
                    label="multiple"
                    required
                    placeholder="hello world"
                    multiple
                />
                <Select
                    name="singletest"
                    onChange={(name, value) => { setSingleValue(value) }}
                    value={singleValue}
                    options={[
                        { key: 'none', value: '', text: 'None' },
                        ...options,
                    ]}
                    label="single"
                    required
                    placeholder="single select"
                />
            </div>
            <p>multiple select value: {testValue.join(', ')}</p>
            <p>single select value: {singleValue}</p>
            <button type="submit">Submit</button>
        </form>
    );
};
export const labelAndRequired = () => {
    const [value, setvalue] = useState("value1")
    const handleChnage = (name: string, value: any) => {
        setvalue(value);
    }
    return (
        <>
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                label="label"
                placeholder="placeholder"
            />
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                required
                label="label + required"
                placeholder="placeholder"
            />
        </>
    )
}
export const disabledAndSearchable = () => {
    const [value, setvalue] = useState("value1")
    const handleChnage = (name: string, value: any) => {
        setvalue(value);
    }
    return (
        <>
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                disabled
                label="disabled"
                placeholder="placeholder"
            />
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                searchable
                label="searchable"
                placeholder="placeholder"
            />
        </>
    )
}
export const width = () => {
    const [value, setvalue] = useState("value1")
    const handleChnage = (name: string, value: any) => {
        setvalue(value);
    }
    return (
        <>
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='100px'
                label="with='100px'"
            />
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='200px'
                label="with='200px'"
            />
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                label="with='300px'"
                placeholder="placeholder"
            />
        </>
    )
}

select.story = {
    name: 'Default'
};