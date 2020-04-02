import React, { useCallback, useState, forwardRef, useRef, useEffect, SyntheticEvent } from 'react'
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import Label from '../Label/Label';
import { Wrapper } from '../Input/Input';
import InputWrapper, { getInputStatus } from '../InputWrapper/InputWrapper';

const InputRangeBlock = styled.div<{ inputWidth: number }>`
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
    onChange?: (name: string, value: string) => void;

    label?: string;
    required?: boolean;

    icon?: any;
    symbol?: string;

    messages?: string[];
    errorMessages?: string[];
    checkError?: (name: string, value: string) => void;

    width?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    ref?: React.MutableRefObject<HTMLInputElement>;

    height?: string;
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
}
type Props = OwnProps;

const InputRange = forwardRef<HTMLInputElement, Props>(
    (
        {
            name, value, onChange,
            required, label, icon,
            symbol, messages,
            checkError, width, placeholder, type = "number", disabled = false, errorMessages,
            height, style, className
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
            if (value) {
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

        const inputStatus = getInputStatus(focus, showError, disabled, errorMessages);

        return (
            <InputWrapper
                label={label}
                required={required}
                messages={messages}
                showError={showError}
                errorMessages={errorMessages}
                width={width}
                className={className}
                style={style}
            >
                <InputRangeBlock inputWidth={inputWidth}>
                    <div className="range">
                        <Wrapper inputStatus={inputStatus} ref={blockRef} height={height}>
                            <input
                                ref={ref}
                                type={type || "text"}
                                name={name}
                                value={value1}
                                onChange={change1}
                                onBlur={handleBlur}
                                onFocus={onFocus}
                                placeholder={placeholder}
                                disabled={disabled}
                                required={required}
                            />
                            {icon && icon}
                            {symbol && <span>{symbol}</span>}
                        </Wrapper>
                        <p>~</p>
                        <Wrapper inputStatus={inputStatus} ref={blockRef} height={height}>
                            <input
                                ref={ref}
                                type={type || "text"}
                                name={name}
                                value={value2}
                                onChange={change2}
                                onBlur={handleBlur}
                                onFocus={onFocus}
                                placeholder={placeholder}
                                disabled={disabled}
                                min={value1}
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