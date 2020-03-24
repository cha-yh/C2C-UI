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
export const select = () => {
    const [testValue, setTestValue] = useState<any>([]); 
    const [singleValue, setSingleValue] = useState<any>(""); 
    
    return (
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
            <Select
                name="multipletest"
                multiple
                onChange={(name, value) => { setTestValue(value) }}
                value={testValue}
                options={[
                    { key: 0, value: 'value1', text: 'text1' },
                    // { key: 1, value: 'value2', text: 'text2' },
                    // { key: 2, value: 'value3', text: 'text3' }
                ]}
                label="multiple"
                required
                width={500}
                placeholder="hello world"
            />
            <div style={{display:'flex'}}>
            <Select
                name="singletest"
                onChange={(name, value) => { setSingleValue(value) }}
                value={singleValue}
                searchable
                options={[
                    { key: 0, value: 'value1', text: 'text1' },
                    { key: 1, value: 'value2', text: 'text2' },
                    { key: 2, value: 'value3', text: 'text3' },
                    { key: 3, value: 'value4', text: 'text4' },
                    { key: 4, value: 'value5', text: 'text5' },
                    { key: 5, value: 'value6', text: 'text6' },
                    { key: 6, value: 'value7', text: 'text7' },
                    { key: 7, value: 'value8', text: 'text8' },
                ]}
                label="single"
                required
                placeholder="single select"
            />

            <Select
                name="singletest"
                disabled
                onChange={(name, value) => { setSingleValue(value) }}
                value={"DISABLED_VALUE"}
                options={[
                    { key: 0, value: 'value1', text: 'text1' },
                    { key: 1, value: 'value2', text: 'text2' },
                    { key: 2, value: 'value3', text: 'text3' }
                ]}
                label="disabled"
                required
            />
            </div>
            <button type="submit">button</button>
        </form>
    );
};

select.story = {
    name: 'Default'
};