import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import {rem, palette, flex} from '../utils';
import Loader from '../Loader/Loader';

type ButtonProps = {
  /** Contents of Button */
  children: React.ReactNode;
  /** Function of clicking Button */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** Theme of colors */
  theme?: 'primary' | 'secondary' | 'tertiary';
  /** Size of Button */
  size?: 'small' | 'medium' | 'big';
  /** Disable Button */
  disabled?: boolean;
  /** Width of Button */
  width?: string | number;
  /** Set width full size */
  full?: boolean;
  /** Basic property: style */
  style?: CSSProperties;
  /** Basic property: className */
  className?: string;
  /** Set loading */
  loading?: boolean;

  /** Color of font */
  fontColor?: string;

  /** Type of Button */
  type?: "button" | "submit" | "reset";
};

/** Button */
const Button = ({
  children,
  theme='primary',
  size='medium',
  disabled=false,
  width, full=false,
  onClick,
  style,
  className,
  loading,
  fontColor,
  type
}: ButtonProps) => {
  const loaderSize = (size:string) => {
    if(size === 'small') {
      return 16;
    } else if(size === 'big') {
      return 26;
    }
    return 22;
  }
  const loaderColor = (theme:string, disabled:boolean) => {
    if(theme==='primary') {
      return 'white';
    }
    if(disabled) {
      return palette.gray400;
    }
    if(theme === 'secondary') {
      return palette.blue500;
    } else if(theme === 'tertiary') {
      return palette.blue500;
    }
    return 'white';
  }
  const buttonFontColor = (disabled:boolean, fontColor?:string) => {
    if(disabled) {
      return null;
    } else {
      if(fontColor) {
        return fontColor;
      } else {
        return null;
      }
    }
  }
  
  return (
    <ButtonBlock
      colorTheme={theme}
      size={size}
      width={width}
      full={full}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={className}
      fontColor={buttonFontColor(disabled, fontColor)}
      type={type}
    >
      {loading
        ? 
        <WithIcon>
          <Loader 
            size={loaderSize(size)}
            color={loaderColor(theme, disabled)}
          />
          {children}
        </WithIcon>
        
        :
        children
      }
    </ButtonBlock>
  );
};
const themes = {
  primary: css`
    background: ${palette.blue500};
    color: white;
    &:hover:enabled {
      background: ${palette.blue600};
    }
    &:active:enabled {
      background: ${palette.blue700};
    }
    &:disabled {
      background: ${palette.gray400};
    }
  `,
  secondary: css`
    background: #e9ecef;
    color: ${palette.gray800};
    &:hover:enabled {
      background: ${palette.gray300};
    }
    &:active:enabled {
      background: ${palette.gray400};
    }
    &:disabled {
      color: #c6d3e1;
    }
  `,
  tertiary: css`
    background: none;
    color: ${palette.blue500};
    &:hover:enabled {
      background: ${palette.gray200};
    }
    &:active:enabled {
      background: ${palette.gray300};
    }
    &:disabled {
      color: ${palette.gray400};
    }
  `
};

const sizes = {
  small: css`
    height: ${rem(30)};
    font-size: ${rem(12)};
    padding: 0 ${rem(10)};
  `,
  medium: css`
    height: ${rem(40)};
    font-size: ${rem(14)};
    padding: 0 ${rem(20)};
  `,
  big: css`
    height: ${rem(50)};
    font-size: ${rem(16)};
    padding: 0 ${rem(30)};
  `
};

const ButtonBlock = styled.button<{ fontColor: string|null, full: boolean, colorTheme: 'primary' | 'secondary' | 'tertiary', size: 'small' | 'medium' | 'big', width: string | number | undefined}>`
  box-sizing: border-box;
  outline: none;
  border: none;
  
  cursor: pointer;
  border-radius: ${rem(2)};
  line-height: 1;
  font-weight: 600;
  ${flex.row};
  ${flex.ai.center};
  ${flex.jc.center};
  &:focus {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }
  &:disabled {
    cursor: not-allowed;
  }
  ${props => props.size
    ?sizes[props.size]
    :sizes.medium 
  };
  ${props => themes[props.colorTheme]};
  width: ${props => props.width};
  ${props => props.full && css`width: 100%;`};
  ${props => props.fontColor && css`color: ${props.fontColor};`};
`;

const WithIcon = styled.div`
  ${flex.row};
  ${flex.ai.center};
  >:first-child {
    margin-right: ${rem(10)};
  }

`;



export default Button;