import React, { useCallback, useState, forwardRef, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import InputWrapper from '../InputWrapper/InputWrapper';

export interface InputProps {
    name?: string,
    value?: string|number,
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    checkError?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    min?: string | number,
    max?: string | number,
    onKeyUp?: ((event: React.KeyboardEvent<HTMLInputElement>) => void),
    step?: string | number,
    required?: boolean,
    pattern?: string,
    size?: number,

    label?: string,
    icon?: any,
    symbol?: string,
    messages?: string[],
    width?: string,
    ref?: React.MutableRefObject<HTMLInputElement>,

    placeholder?: string,
    type?: string,
    disabled?: boolean,
    errorMessages?: string[],
    height?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            name, value, onChange,
            required, label, icon,
            symbol, messages,
            checkError, width, placeholder, type, disabled=false, errorMessages=[],
            min, max, onKeyUp, step, pattern, size,
            height
        },
        ref
    ) => {
    const [focus, setFocus] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);
    const [showError, setShowError] = useState(false);

    const onFocus = useCallback(() => {
        setFocus(true);
    }, []);
    const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFocus(false);
        setShowError(true);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (checkError) checkError(e);
        
    }, []);

    useEffect(() => {
        blockRef.current &&
            setInputWidth(blockRef.current.clientWidth);

        if(value) {
            setShowError(true);
        }
    }, [])

    const blockRef = useRef<HTMLDivElement>(null);
    const inputStatus = () => {
        if(focus) {
            return 'focus';
        }
        if(disabled) {
            return 'disabled';
        }
        if(errorMessages.length&&showError) {
            return 'error';
        } else {
            return null;
        }
    }
    return (
        <InputWrapper
            label={label}
            required={required}
            messages={messages}
            showError={showError}
            errorMessages={errorMessages}
            width={width}
        >
            <Wrapper inputStatus={inputStatus()} height={height}>
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    disabled={disabled}
                    min={min}
                    max={max}
                    onKeyUp={onKeyUp}
                    step={step}
                    required={required}
                    pattern={pattern}
                    size={size}
                />
                {icon && icon}
                {symbol && <span>{symbol}</span>}
            </Wrapper>
        </InputWrapper>
    )
})

const styles = {
    focus: css`
        border-color: ${palette.blue500};
    `,
    disabled: css`
        border-color: ${palette.gray500};
        background: ${palette.gray200};
        >input {cursor: not-allowed;}
    `,
    error: css`
        border-color: ${palette.red500};
    `
}
export const Wrapper = styled.div<{inputStatus:'focus'|'disabled'|'error'|null, height:string|undefined}>`
    ${utils.initiateCss};
    width: 100%;
    height: ${props => props.height ?props.height :rem(40)};
    margin: 0;
    padding-right: ${rem(13)};
    border: 1px solid ${palette.gray400};
    border-radius: 2px;
    background: ${palette.gray100};
    color: ${palette.gray800};
    font-family: 'Montserrat';
    transition: all 0.125s ease-in;
    ${flex.row};
    ${flex.ai.center};
    ${props => props.inputStatus && styles[props.inputStatus]};

    
    
    >input {
        width: 100%;
        height: 100%;
        padding: ${rem(13)};
        background: none;
        border: none;
        outline: none;
    }

    >input::placeholder {
        color: ${palette.gray500};
        font-size: ${rem(14)};
        letter-spacing: 0;
    }

    >span {
        color: gray;
        font-size: ${rem(14)};
        ${flex.flex("0 0 auto")};
    }
`;
export default Input;