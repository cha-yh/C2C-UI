import React, { useState } from 'react';
import Input from './Input';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
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
  const label = text('label', 'test-label');
  const symbol = text('symbol', 'kg');
  const require = boolean('require', true);
  const disabled = boolean('disabled', false);
  const placeholder = text('placeholder', "placeholder");
  const type = text('type', 'text');
  const [first, setFirst] = useState("");
  const onChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirst(e.target.value)
  }
  return (
      <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      <Input
          label={label}
          symbol={symbol}
          placeholder={placeholder}
          disabled={disabled}
          type={'number'}
          step={0.001}
          min={0}
          max={1}
          value={first}
          name="first"
          onChange={onChangeFirst}
          required
          size={10}
        />

        <Input
          label={label}
          required
          symbol={symbol}
          placeholder={placeholder}
          disabled={disabled}
          errorMessages={[]}
        />

        <Input
          message={["first messages. It's test dummy text.", 'second']}
          label={label}
          required
          symbol={symbol}
          placeholder={placeholder}
          disabled={disabled}
          errorMessages={['first error', 'second error', 'third']}
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
        width={300}
      />
      <Input
        symbol="km/h"
        width={300}
      />
      <Input
        symbol="km/h"
        icon={<FaCalendarAlt/>}
        width={300}
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
        label="width={500}"
        width={500}
      />
      <Input
        label="width={600}"
        width={600}
      />
      <Input
        label="width={700}"
        width={700}
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

      

    </Box>
  )
}