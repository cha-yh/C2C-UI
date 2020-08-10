import React, { useState } from 'react';
import Input from './Input';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../Button/Button';
import { Box } from '../storyStyle';
export default {
  title: 'components|Input',
  component: Input,
  parameters: {
    docs: {
      inlineStories: false
    }
  },
  decorators: [withKnobs]
};

export const input = () => {
  const label = text('label', 'Label');
  const symbol = text('symbol', '');
  const required = boolean('required', true);
  const disabled = boolean('disabled', false);
  const placeholder = text('placeholder', "placeholder");
  const type = text('type', 'text');
  const messages = array('messages', []);
  const errorMessages = array('errorMessages', []);
  const width = text('width', '700px');

  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const submit = (e:React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    alert(value);
  }
  return (
      <form onSubmit={submit}>
        <Input
          name=""
          value={value}
          onChange={onChange}
          label={label}
          type={type}
          required={required}
          symbol={symbol}
          placeholder={placeholder}
          disabled={disabled}
          messages={messages}
          errorMessages={errorMessages}
          width={width}
        />
        <Button type="submit" >btn</Button>
      </form>
  );
};

input.story = {
  name: 'Default'
};


export const options = () => {
  return (
    <Box>
      <h5>with Label & required</h5>
      <Input
        label="label1"
      />
      <Input
        label="label+required"
        required
      />
      
      <h5>with Icon & Symbol</h5>
      <Input
        icon={<FaCalendarAlt/>}
        width='300px'
      />
      <Input
        symbol="km/h"
        width='300px'
      />
      <Input
        symbol="km/h"
        icon={<FaCalendarAlt/>}
        width='300px'
      />

      <h5>with messages & error messages</h5>
      <Input
        label="with messages"
        messages={["message1", "message2"]}
      />
      <Input
        label="with error message(when focus out, shown)"
        errorMessages={["error1", "error2"]}
      />

      <h5>width</h5>
      <Input
        label="width='500px'"
        width='500px'
      />
      <Input
        label="width='600px'"
        width='600px'
      />
      <Input
        label="width='700px'"
        width='700px'
      />

      <h5>placeholder & disabled</h5>
      <Input
        placeholder="hello input"
      />
      <Input
        disabled
      />
      <Input
        disabled
        placeholder="hello input"
      />

      <h5>height</h5>
      <Input 
        label="height='2.5rem'"
        height='2.5rem'
      />

      <Input 
        label="height='3rem'"
        height='3rem'
      />

      <h5>With datalist</h5>
      <Input
        list="ice-cream-flavors"
        dataList={["Chocolate", "Coconut", "Mint", "Strawberry", "Vanilla"]}
      />

    </Box>
  )
}