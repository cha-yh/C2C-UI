import React from 'react';
import styled, {css} from 'styled-components';
import {utils, flex, rem} from '../utils';

const ButtonGroupBlock = styled.div<{ direction: 'row'|'column'|undefined, gap: number, rightAlign: boolean|undefined, width: string }>`
  ${props => props.direction === 'row'
    ? css`
        ${flex.row};
        button + button {
          margin-left: ${rem(props.gap)}
        }
      `
    : css`
        ${flex.col};
        width: ${props.width};
        button + button {
          margin-top: ${rem(props.gap)}
        }
      `
  };

  ${props => props.rightAlign && flex.jc.end}
`;

export type ButtonGroupProps = {
  /** Direction of children */
  direction?: 'row' | 'column';
  /** Set align right */
  rightAlign?: boolean;
  /** gap of between children */
  gap?: number;
  /** When `Direction` is `column`, working */
  width?: string;
  
  children: React.ReactNode;
  className?: string;
  style?: any;
};

/**
 * For grouping Buttons
 */
const ButtonGroup = ({
  direction="row",
  rightAlign=false,
  children,
  gap=10,
  className,
  style,
  width="100%"
}: ButtonGroupProps) => {
  return (
    <ButtonGroupBlock
      direction={direction}
      rightAlign={rightAlign}
      gap={gap}
      width={width}
      style={style}
      className={className}
    >
      {children}
    </ButtonGroupBlock>
  );
};

export default ButtonGroup;