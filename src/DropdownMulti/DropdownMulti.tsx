import React, { useState, useCallback, SyntheticEvent, useRef } from 'react';
import _ from 'lodash';
import styled, {css} from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

import UnD from '../UnD/UnD';
import { MdSearch, MdClose } from 'react-icons/md';
// import OutsideClickHandler from 'react-outside-click-handler';
import { Scrollbars } from 'react-custom-scrollbars';
import CheckBox from '../CheckBox/CheckBox';
import Input from '../Input/Input';
import InputWrapper from '../InputWrapper/InputWrapper';
import { dropdownStyles } from '../Dropdown/Dropdown';
import { useOnClickOutside } from '../hooks';

const SelectedItemBlock = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null }>`
    width: fit-content;
    height: ${rem(23)};
    margin: ${rem(2)};
    padding: ${rem(5)} ${rem(10)};
    background: ${palette.blue500};
    ${flex.row};
    ${flex.ai.center};
    border-radius: ${rem(100)};
    

    >h5 {
        color: white;
    }

    >svg {
        color: white;
    }

    >:first-child {
        margin-right: ${rem(5)};
    }

    ${props => props.inputStatus === 'disabled' && css`
        background: ${palette.gray400};
        color: ${palette.red200};
    `}
`;
const ListItemBlock = styled.div`
    ${flex.row};
    >p {

    }
`;
const DropdownMultiBlock = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null }>`
    ${utils.initiateCss};
    position: relative;
    width: 100%;
    min-width: ${rem(200)};

    .box {
        min-height: ${rem(45)};
        border: 1px solid ${palette.gray400};
        padding: 0 ${rem(13)};
        ${flex.row};
        ${flex.jc.spaceB};
        ${flex.ai.center};
        background: white;

        >.placeholder {
            color: ${palette.gray500};
            font-size: ${rem(12)};
            letter-spacing: -1px;
        }

        >.selected-box {
            ${flex.row};
            ${flex.jc.start};
            ${flex.wrap};
            width: 100%;
        }
    }

    .list {
        z-index: 1;
        width: 100%;
        border: 1px solid ${palette.gray400};
        min-height: ${rem(200)};
        padding: ${rem(10)};
        padding-top: 0;
        background: white;
        ${utils.shadow};
        position: absolute;

        .input-wrapper {
            ${flex.row};
            ${flex.jc.spaceB};
            ${flex.ai.center};
            border: 1px solid ${palette.gray300};
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
                cursor: pointer;
                margin-right: ${rem(10)};
                &:hover {
                    background: ${palette.gray300};
                }
            }
        }
    }

    ${props => props.inputStatus && dropdownStyles[props.inputStatus]};
`;

interface OwnProps {
    onChange: (name: string, value: string[] | number[] | any) => void;
    value: string[];
    name: string;
    placeholder?: string;
    options: Array<{ key: number, value: string | number, text: string }>;
    checkError?: (name: string, value: string[] | number[] | any) => void;
    message?: string[];
    label?: string;
    require?: boolean;
    search?: boolean;
    disabled?: boolean;
    errorMessages?: string[];
    width?: number;
}
type Props = OwnProps;

const DropdownMulti = ({
    onChange, value, name,
    placeholder = "Select Values",
    options, checkError, message,
    label, require, search, disabled = false, errorMessages, width
}: Props) => {
    const [showError, setShowError] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleListChange = (itemValue: any) => {

        const copy = [...value];
        const exist = copy.some(item => {
            return item === itemValue;
        });
        if (exist) { // exist already
            _.remove(copy, (item: any) => {
                return item === itemValue
            })

            onChange(name, copy);

        } else {
            copy.push(itemValue);
            onChange(name, copy);
        }
    }

    const removeBlock = (e: SyntheticEvent, itemValue: any) => {
        if(disabled) {
            return;
        }
        e.stopPropagation();
        const copy = [...value];
        _.remove(copy, (item: any) => {
            return item === itemValue;
        })
        onChange(name, copy);
        setShowError(true);
        checkError && checkError(name, copy);
    }

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const closeList = useCallback((value: string[] | number[], focus: boolean) => {
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
    useOnClickOutside(ref, ()=>closeList(value, focus));
    return (
        <InputWrapper
            label={label}
            required={require}
            messages={message}
            showError={showError}
            errorMessages={errorMessages}
            width={width}
        >
            <DropdownMultiBlock inputStatus={inputStatus()} ref={ref}>
                    <div className="box" onClick={handleDivClick}>
                        {value.length === 0
                            ?
                            <p className="placeholder">{placeholder || 'select item'}</p>

                            :
                            <div className="selected-box">
                                {value.map((item: string, index: number) => {
                                    const itemIndex = _.findIndex(options, (o:any)=> {
                                        return o.value === item;
                                    })
                                    const itemText = options[itemIndex].text;
                                    return (
                                        <SelectedItemBlock
                                            key={`${item}-${index}`}
                                            inputStatus={inputStatus()}
                                        >
                                            <h5>{itemText}</h5>
                                            <MdClose onClick={(e) => removeBlock(e, item)} />
                                        </SelectedItemBlock>
                                    )
                                }

                                )}
                            </div>
                        }
                        <UnD value={focus} />
                    </div>

                    {focus && <div className="list">
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
                                            <ListItemBlock
                                                onClick={() => { handleListChange(item.value); }}
                                                key={item.value}
                                            >
                                                <CheckBox checked={value.some(innerItem => { return innerItem === item.value })} />
                                                <p className="item">{item.text}</p>
                                            </ListItemBlock>
                                        )
                                    }
                                })}
                            </Scrollbars>
                        </div>
                    </div>}
                {/* {(message && showError) && <span className="msg">{message}</span>} */}
            </DropdownMultiBlock>
        </InputWrapper>
    );
};

export default DropdownMulti;
