import React, { useCallback, useState, forwardRef, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import InputWrapper from '../InputWrapper/InputWrapper';

export type InputProps = {
    name?: string;
    value?: string;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    checkError?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    require?: boolean;

    label?: string;
    icon?: any;
    symbol?: string;
    message?: string[];
    width?: number;
    ref?: React.MutableRefObject<HTMLInputElement>;

    placeholder?: string;
    type?: string;
    disabled?: boolean;
    errorMessages?: string[];
}

const Input = forwardRef(
    (
        {
            name, value, onChange,
            require, label, icon,
            symbol, message,
            checkError, width, placeholder, type, disabled=false, errorMessages
        }:InputProps,
        ref?: React.Ref<HTMLInputElement>
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
        if(errorMessages&&showError) {
            return 'error';
        } else {
            return null;
        }
    }
    return (
        <InputWrapper
            label={label}
            required={require}
            messages={message}
            showError={showError}
            errorMessages={errorMessages}
            width={width}
        >
            <Wrapper inputStatus={inputStatus()}>
                <input
                    ref={ref}
                    type={type||"text"}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {icon && icon}
                {symbol && <span>{symbol}</span>}
            </Wrapper>
        </InputWrapper>
    )
})

const styles = {
    focus: css`
        border-color: ${palette.blue};
    `,
    disabled: css`
        border-color: ${palette.gray};
        background: ${palette.grayLighten30};
        >input {cursor: not-allowed;}
    `,
    error: css`
        border-color: ${palette.red};
    `
}
export const Wrapper = styled.div<{inputStatus:'focus'|'disabled'|'error'|null}>`
    ${utils.initiateCss};
    width: 100%;
    height: ${rem(45)};
    margin: 0;
    padding-right: ${rem(13)};
    border: 1px solid ${palette.grayLighten10};
    border-radius: 2px;
    background: ${palette.grayLighten40};
    color: ${palette.grayDarken30};
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
        color: ${palette.gray};
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