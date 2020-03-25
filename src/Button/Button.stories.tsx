import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'components|Button',
  component: Button,
  decorators: [withKnobs]
};

export const button = () => {
  const label = text('children', 'BUTTON');
  const size = select('size', ['small', 'medium', 'big'], 'medium');
  const theme = select(
    'theme',
    ['primary', 'secondary', 'tertiary'],
    'primary'
  );
  const disabled = boolean('disabled', false);
  const loading = boolean('loading', false);
  const full = boolean('full', false);
  const width = text('width', '');
  const fontColor = text('fontColor', '');

  return (
    <Button
      size={size}
      theme={theme}
      disabled={disabled}
      width={width}
      onClick={action('onClick')}
      loading={loading}
      full={full}
      fontColor={fontColor}
    >
      {label}
    </Button>
  );
};

button.story = {
  name: 'Default'
};
const ButtonWrapper = styled.div`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;

export const themes = () => {
  return (
    <ButtonWrapper>
      <div>
        <Button>theme="primary"</Button>
      </div>
      <div>
        <Button theme="secondary">theme="secondary"</Button>
      </div>
      <div>
        <Button theme="tertiary">theme="tertiary"</Button>
      </div>
    </ButtonWrapper>
  )
}


export const sizes = () => {
  return (
    <ButtonWrapper>
      <div>
        <Button size="small">size="small"</Button>
      </div>
      <div>
        <Button size="medium">size="medium"</Button>
      </div>
      <div>
        <Button size="big">size="big"</Button>
      </div>
    </ButtonWrapper>
  );
};

export const disabled = () => {
    return (
      <ButtonWrapper>
        <div>
          <Button disabled>PRIMARY</Button>
        </div>
        <div>
          <Button disabled theme="secondary">
            theme="secondary" disabled
          </Button>
        </div>
        <div>
          <Button disabled theme="tertiary">
            theme="tertiary" disabled
          </Button>
        </div>
      </ButtonWrapper>
    );
  };

  export const customSized = () => {
    return (
      <ButtonWrapper>
        <div>
          <Button width="100px">width="100px"</Button>
        </div>
        <div>
          <Button width="20rem">width="20rem"</Button>
        </div>
        <div>
          <Button width="70%">width="70%"</Button>
        </div>
        <div>
          <Button full>'full' option</Button>
        </div>
      </ButtonWrapper>
    );
  };

  export const loading = () => {
    return (
      <ButtonWrapper>
        <div>
          <Button loading size="small">PRIMARY</Button>
        </div>
        <div>
          <Button loading theme="secondary" size="medium">
            SECONDARY
          </Button>
        </div>
        <div>
          <Button loading theme="tertiary" size="big">
            TERTIARY
          </Button>
        </div>
      </ButtonWrapper>
    )
  }