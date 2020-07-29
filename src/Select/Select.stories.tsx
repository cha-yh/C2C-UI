import React, { useState } from 'react';
import Select from './Select';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';
import Input from '../Input/Input';

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

export const heightCompareWithInput = () => {
    const [value, setvalue] = useState("value1")
    const handleChnage = (name: string, value: any) => {
        setvalue(value);
    }
    return (
        <div>
        <div style={{display: 'flex'}}>
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                placeholder="placeholder"
                label="Select height='30px'"
                height="30px"
            />
            <Input
                label="Input height='30px'"
                height="30px"
                width='300px'
            />
        </div>
        <div style={{display: 'flex'}}>
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                placeholder="placeholder"
                label="Select height='40px'"
                height="40px"
            />
            <Input
                label="Input height='40px'"
                height="40px"
                width='300px'
            />
        </div>

        <div style={{display: 'flex'}}>
            <Select
                name=""
                value={value}
                onChange={handleChnage}
                options={options}
                width='300px'
                placeholder="placeholder"
                label="Select height='50px'"
                height="50px"
            />
            <Input
                label="Input height='50px'"
                height="50px"
                width='300px'
            />
        </div>
        </div>
    )
}

export const withErrorMessages = () => {
    const [singleValue, setSingleValue] = useState<any>([]); 
    const [errors, setErrors] = useState([]);
    const checkError = (name: string, value: string | number | string[]) => {
        const tempError = [...errors];
        if(typeof value !== 'object') {
            return;
        }
        if(value.length === 0) {
            tempError.push([`empty`])
            setErrors(tempError);
        } else {
            setErrors([]);
        }
    }
    return (
        <Select
            name="singletest"
            onChange={(name, value) => { setSingleValue(value) }}
            value={singleValue}
            options={[
                { key: 'none', value: '', text: 'None' },
                ...options,
            ]}
            errorMessages={errors}
            checkError={checkError}
            multiple
        />
    )
}

export const nullValue = () => {
    const [testValue, setTestValue] = useState<any[]>(null);
    const [singleValue, setSingleValue] = useState<any>(null); 
    return (
        <div style={{display:'flex'}}>
            <Select
                name="multipletest"
                onChange={(name, value) => { setTestValue(value) }}
                value={testValue}
                options={options}
                label="multiple"
                required
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
    )
}

export const otherValue = () => {
    const [testValue, setTestValue] = useState(['value8', 'otherValue']);
    const [singValue, setSingValue] = useState('otherValue')
    return (
        <>
            <p>otherValue isn't in options</p>
            <div style={{display:'flex'}}>
                <Select
                    name="single"
                    onChange={(name, value) => { setSingValue(value) }}
                    value={singValue}
                    options={options}
                    label="multiple"
                    required
                />

                <Select
                    name="multipletest"
                    onChange={(name, value) => { setTestValue(value) }}
                    value={testValue}
                    options={options}
                    label="multiple"
                    required
                    multiple
                />
            </div>
        </>
    )
}

export const Typeable = () => {
    const [testValue, setTestValue] = useState(['value8', 'otherValue', 'other2']);
    const [singValue, setSingValue] = useState('otherValue')
    return (
        <>
            <p>Typeable with typeablePlaceholder</p>
            <div>
                <Select
                    name="single"
                    onChange={(name, value) => { setSingValue(value) }}
                    value={''}
                    options={options}
                    label="single"
                    required
                    typeable
                    typeablePlaceholder="It's typeablePlaceholder"
                />
            </div>

            <p>Typeable in wide box</p>
            <div style={{display:'flex'}}>
                <Select
                    name="single"
                    onChange={(name, value) => { setSingValue(value) }}
                    value={singValue}
                    options={options}
                    label="single"
                    required
                    typeable
                />

                <Select
                    name="multipletest"
                    onChange={(name, value) => { setTestValue(value) }}
                    value={testValue}
                    options={options}
                    label="multiple"
                    required
                    multiple
                    typeable
                />
            </div>

            <p>Typeable in narrow box</p>
            <div style={{display:'flex', width:'300px'}}>
                <Select
                    name="single"
                    onChange={(name, value) => { setSingValue(value) }}
                    value={singValue}
                    options={options}
                    label="single"
                    required
                    typeable
                />

                <Select
                    name="multipletest"
                    onChange={(name, value) => { setTestValue(value) }}
                    value={testValue}
                    options={options}
                    label="multiple"
                    required
                    multiple
                    typeable
                />
            </div>
        </>
    )
}

export const ListPosition = () => {
    const [testValue, setTestValue] = useState(['value8', 'otherValue', 'other2']);
    const [singValue, setSingValue] = useState('otherValue')
    return (
        <>
            <p style={{height: '600px', background: 'white'}}>List Position</p>
            <div style={{display:'flex'}}>
                <Select
                    name="single"
                    onChange={(name, value) => { setSingValue(value) }}
                    value={singValue}
                    options={options}
                    label="single select, height = 80px"
                    required
                    height={'80px'}
                    typeable
                    typeablePlaceholder="select direct input"
                />

                <Select
                    name="multipletest"
                    onChange={(name, value) => { setTestValue(value) }}
                    value={testValue}
                    options={options}
                    label="multiple"
                    required
                    multiple
                    typeable
                    typeablePlaceholder="add direct input"
                />
            </div>
            <p style={{height: '12000px', background: 'white'}}></p>
        </>
    )
}

select.story = {
    name: 'Default'
};