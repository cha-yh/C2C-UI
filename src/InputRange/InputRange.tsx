import React, { useCallback, useState, forwardRef, useRef, useEffect, SyntheticEvent } from 'react'
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import Label from '../Label/Label';
import {Wrapper} from '../Input/Input';
import InputWrapper from '../InputWrapper/InputWrapper';

const InputRangeBlock = styled.div<{width: number | undefined, inputWidth: number }>`
    width: 100%;
    width: ${props => props.width && rem(props.width)};
    >.range {
        ${flex.row};
        ${flex.ai.center};
        >:nth-child(2) {
            margin: 0 ${rem(10)};
        }
        >* {
            ${flex.flex('auto')};
        }
    }

`;

interface OwnProps {
    name: string;
    value: string;
    onChange?: (name: string, value: string)=>void;
    checkError?: (name: string, value: string)=>void;
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
type Props = OwnProps;

const InputRange = forwardRef(
    (
        { 
            name, value, onChange,
            require, label, icon,
            symbol, message,
            checkError, width, placeholder, type, disabled=false, errorMessages
        }:Props,
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

    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const change1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue1(value);
        const combinedValue = value2 ? `${value}~${value2}` : `${value}`
        if (onChange) onChange(name, combinedValue);
        if (checkError) checkError(name, combinedValue);
    }
    const change2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue2(value);
        const combinedValue = value ? `${value1}~${value}` : `${value1}`
        if (onChange) onChange(name, combinedValue);
        if (checkError) checkError(name, combinedValue);
    }

    useEffect(() => {
        // if(value) {
        //     if (_.includes(value, '~')) {
        //         setValue1(value.split('~')[0])
        //         setValue2(value.split('~')[1])
        //     } else {
        //         setValue1(value)
        //         setValue2("")
        //     }
        // }
        blockRef.current &&
            setInputWidth(blockRef.current.clientWidth);
    }, [])

    useEffect(() => {
        if(value) {
            if (_.includes(value, '~')) {
                setValue1(value.split('~')[0])
                setValue2(value.split('~')[1])
            } else {
                setValue1(value)
                setValue2("")
            }
        }
    }, [value])

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
        >
            <InputRangeBlock width={width} inputWidth={inputWidth}>
                <div className="range">
                    <Wrapper inputStatus={inputStatus()} ref={blockRef}>
                        <input
                            ref={ref}
                            type={type||"text"}
                            name={name}
                            value={value1}
                            onChange={change1}
                            onBlur={handleBlur}
                            onFocus={onFocus}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                        {icon && icon}
                        {symbol && <span>{symbol}</span>}
                    </Wrapper>
                    <p>~</p>
                    <Wrapper inputStatus={inputStatus()} ref={blockRef}>
                        <input
                            ref={ref}
                            type={type||"text"}
                            name={name}
                            value={value2}
                            onChange={change2}
                            onBlur={handleBlur}
                            onFocus={onFocus}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                        {icon && icon}
                        {symbol && <span>{symbol}</span>}
                    </Wrapper>
                </div>
            </InputRangeBlock>
        </InputWrapper>
    )
})

export default InputRange;