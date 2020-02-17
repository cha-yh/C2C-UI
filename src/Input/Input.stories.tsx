import React, { useState } from 'react';
import Input from './Input';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../Button/Button';
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
  const [first, setFirst] = useState(null);
  const onChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirst(Number(e.target.value))
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


export const styles = () => {
  return (
    <React.Fragment>
      <h4>error</h4>
      <Input
        label="label"
        required
        errorMessages={["error1", "error2", "error2", "error2", "error2", "error2", "error2", "error2", "error2"]}
      />

      <h4>disabled</h4>
      <Input
        disabled
      />

      <h4>with Symbol</h4>
      <Input
        symbol="km/h"
      />

      <h4>with Icon</h4>
      <Input
        icon={<FaCalendarAlt/>}
      />
      <h4>with placeholder</h4>
      <Input
        placeholder="hello input"
      />

      <h4>with Label</h4>
      <Input
        label="label1"
      />
      <Input
        label="label2"
        required
      />

      


    </React.Fragment>
  )
}