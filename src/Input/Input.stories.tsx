import React from 'react';
import Input from './Input';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { FaCalendarAlt } from 'react-icons/fa';

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
  const error = boolean('error', true);
  const require = boolean('require', true);
  const disabled = boolean('disabled', false);
  const placeholder = text('placeholder', "placeholder");

  return (
    <Input
      error={error}
      label={label}
      require={require}
      symbol={symbol}
      placeholder={placeholder}
      disabled={disabled}
    />
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
        error={true}
        label="label"
        require={true}
        message={["error1", "error2", "error2", "error2", "error2", "error2", "error2", "error2", "error2"]}
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
        require
      />

      


    </React.Fragment>
  )
}