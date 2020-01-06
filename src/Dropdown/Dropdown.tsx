import React, { useState, useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

import UnD from '../UnD/UnD';
import { MdSearch } from 'react-icons/md';

import { Scrollbars } from 'react-custom-scrollbars';
import Input from '../Input/Input';
import InputWrapper from '../InputWrapper/InputWrapper';

import {useOnClickOutside} from '../hooks';

interface OwnProps {
    onChange: (name: string, value: string | number) => void;
    value: string | number;
    name: string;
    placeholder?: string;
    options: Array<{ key: number, value: string | number, text: string }>;
    checkError?: (name: string, value: string | number) => void;
    message?: string[];
    label?: string;
    require?: boolean;
    search?: boolean;
    disabled?: boolean;
    errorMessages?: string[];
    width?: number;
}
type Props = OwnProps;

const Dropdown = ({
    onChange, value, name, placeholder, options, checkError, message,
    label, require, search, disabled = false, errorMessages, width
}:Props) => {
    const [ showError, setShowError] = useState(false);
    const [focus, setFocus] = useState(false);

    const clickListItem = (value: any) => {
        onChange && onChange(name, value);
        closeList(value, focus);
    }

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const closeList = useCallback((value: string | number, focus: boolean) => {
        if (focus) {
            setFocus(false);
            checkError && checkError(name, value);
            setShowError(true);
        }
    }, []);

    const handleDivClick = () => {
        if (disabled) {
            return;
        }
        
        if (focus) {
            setFocus(false);
            checkError && checkError(name, value);
            setShowError(true);
        } else {
            setFocus(true);
        }
    };

    let index = -1;
    if (value) {
        index = _.findIndex(options, (o: any) => {
            return o.value === value;
        });
    }

    let valueText = '';
    if (index !== -1) {
        valueText = options[index].text;
    }
    const inputStatus = () => {
        if (focus) {
            return 'focus';
        }
        if (disabled) {
            return 'disabled';
        }
        if (errorMessages&&showError) {
            return 'error';
        } else {
            return null;
        }
    }

    const ref = useRef(null);
    useOnClickOutside(ref, () => closeList(value, focus));
    return (
        <InputWrapper
            label={label}
            required={require}
            messages={message}  
            showError={showError}
            errorMessages={errorMessages}
            width={width}
        >
            <Block inputStatus={inputStatus()} ref={ref}>
                    <div className="box" onClick={handleDivClick}>
                        <p className={cx("placeholder", { 'selected': (valueText || value) })}>{valueText || value || placeholder || 'select item'}</p>
                        <UnD value={focus} />
                    </div>

                    <div className="list">
                        {search &&
                            <Input
                                onChange={handleInputChange}
                                value={inputValue}
                                icon={<MdSearch />}
                            />
                        }
                        <div className="list-wrapper">
                            <Scrollbars>
                                {options.map(item => {
                                    if (_.includes(item.text.toLowerCase(), inputValue.toLowerCase())) {
                                        return (
                                            <p className="item"
                                                onClick={() => { clickListItem(item.value); }}
                                                key={item.key}
                                            >
                                                {item.text}
                                            </p>
                                        )
                                    }
                                })}
                            </Scrollbars>
                        </div>
                    </div>
            </Block>
        </InputWrapper>
    );
};

export const dropdownStyles = {
    focus: css`
        .box {
            border-color: ${palette.blue};
            border-bottom: none;
        }
        .list {
            border-color: ${palette.blue};
            border-top: none;
            display: block;
        }
        
    `,
    disabled: css`
        .box {
            border-color: ${palette.gray};
            background: ${palette.grayLighten30};

            .placeholder.selected {
                color: ${palette.gray};
            }
        }
        cursor: not-allowed;
    `,
    error: css`
        .box {
            border-color: ${palette.red};
        }

        .error {
            color: ${palette.red};
        }
    `
}

const Block = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null }>`
    ${utils.initiateCss};
    position: relative;
    width: 100%;    
    .box {
        height: ${rem(45)};
        border: 1px solid ${palette.grayLighten10};
        padding: 0 ${rem(13)};
        ${flex.row};
        ${flex.jc.spaceB};
        ${flex.ai.center};
        background: white;
        
        >.placeholder {
            color: ${palette.gray};
            font-size: ${rem(14)};
            letter-spacing: -1px;
        }

        >.placeholder.selected {
            color: black;
        }
    }

    .list {
        z-index: 1;
        width: 100%;
        border: 1px solid ${palette.grayLighten10};
        padding: ${rem(10)};
        padding-top: 0;
        background: white;
        ${utils.shadow};
        position: absolute;
        display: none;

        .input-wrapper {
            ${flex.row};
            ${flex.jc.spaceB};
            ${flex.ai.center};
            border: 1px solid ${palette.grayLighten20};
            padding-right: ${rem(10)};
            >input {
                width: 100%;
                border-radius: 2px;
                margin-right: ${rem(10)};
                border: none;
                outline: none;
                padding: ${rem(10)};
            }
            >p {

            }
        }

        .list-wrapper {
            padding-top: ${rem(10)};

            /** Scrollbar */
            >div {
                >div:first-child {
                    max-height: 12.5rem !important;
                    min-height: 7rem !important;
                    position: unset !important;
                    /* overflow-x: auto !important; */
                    /* height: 100% !important; */
                }
            }


            .item {
                padding: ${rem(5)} 0;
                font-weight: 700;
                margin: 0;
                cursor: pointer;
                margin-right: ${rem(10)};
                &:hover {
                    background: ${palette.grayLighten20};
                }
            }
        }
    }
    ${props => props.inputStatus && dropdownStyles[props.inputStatus]};
`;

export default Dropdown;
