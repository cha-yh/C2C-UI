import React from 'react';
import ButtonGroup from './ButtonGroup';
import Button from '../Button/Button';
import { withKnobs, number, radios, boolean } from '@storybook/addon-knobs';

export default {
  title: 'components|ButtonGroup',
  component: ButtonGroup,
  decorators: [withKnobs]
};

export const buttonGroup = () => {
  const direction = radios(
    'direction',
    { Row: 'row', Column: 'column' },
    'row'
  );
  const rightAlign = boolean('rightAlign', false);
  const gap = number('gap', 10);

  return (
    <ButtonGroup direction={direction} rightAlign={rightAlign} gap={gap}>
      <Button theme="tertiary">취소</Button>
      <Button>확인</Button>
    </ButtonGroup>
  );
};

buttonGroup.story = {
  name: 'Default'
};

export const rightAlign = () => {
  return (
    <>
      <p>rightAlign={'true'}</p>
      <ButtonGroup rightAlign>
        <Button theme="tertiary">Cancel</Button>
        <Button>Confirm</Button>
      </ButtonGroup>
    </>
  );
};

export const column = () => {
  return (
    <>
      <p>direction="column"</p>
      <ButtonGroup direction="column">
        <Button>CLICK ME</Button>
        <Button>CLICK ME</Button>
      </ButtonGroup>
    </>
  );
};

export const customGap = () => {
  return (
    <>
      <p>{`gap={16}`}</p>
      <ButtonGroup gap={16}>
        <Button theme="tertiary">Cancel</Button>
        <Button>Confirm</Button>
      </ButtonGroup>
    </>
  );
};

export const customGapColumn = () => {
  return (
    <>
      <p>{`direction="column" gap={16}`}</p>
      <ButtonGroup direction="column" gap={16}>
        <Button>CLICK ME</Button>
        <Button>CLICK ME</Button>
      </ButtonGroup>
    </>
  );
};

export const columnWithWidth = () => {
  return (
    <>
      <p>direction="column" width="20rem"</p>
      <ButtonGroup direction="column" width="20rem">
        <Button>CLICK ME</Button>
        <Button>CLICK ME</Button>
      </ButtonGroup>
    </>
  )
}