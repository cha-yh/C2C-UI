import React, { useState, useCallback, SyntheticEvent, useRef, ReactText } from 'react';
import _ from 'lodash';
import styled, {css} from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

import { useOnClickOutside } from '../hooks';
import UnD from '../UnD/UnD';
import { MdSearch, MdClose } from 'react-icons/md';

import { Scrollbars } from 'react-custom-scrollbars';
import Input from '../Input/Input';
import InputWrapper from '../InputWrapper/InputWrapper';

import { DropdownBlock, DropdownProps } from '../Dropdown/Dropdown';
import CheckBox from '../CheckBox/CheckBox';

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
interface OwnProps<T> {
    onChange: (name: string, value: T) => void;
    value: T;
    name: string;
    placeholder?: string;
    options: Array<{ key: number, value: ReactText, text: string }>;
    checkError?: (name: string, value: T) => void;
    messages?: string[];
    label?: string;
    required?: boolean;
    search?: boolean;
    disabled?: boolean;
    /**When the focus of Dropdown component is out, it will be shown*/
    errorMessages?: string[];
    width?: number;
}
type Props = OwnProps<ReactText[]>;

const DropdownMulti = ({
    onChange, value, name, placeholder, options, checkError, messages,
    label, required, search, disabled = false, errorMessages, width
}: Props) => {
    const [showError, setShowError] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleListChange = (itemValue: ReactText) => {

        const copy = [...value];
        const exist = copy.some((item:ReactText) => {
            return item === itemValue;
        });
        if (exist) { // exist already
            _.remove<ReactText>(copy, (item: any) => {
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

    const closeList = useCallback((value: ReactText[], focus: boolean) => {
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
        if (errorMessages?.length&&showError) {
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
            required={required}
            messages={messages}
            showError={showError}
            errorMessages={errorMessages}
            width={width}
        >
            <DropdownBlock inputStatus={inputStatus()} ref={ref}>
                    <div className="box" onClick={handleDivClick}>
                        {value.length === 0
                            ?
                            <p className="placeholder">{placeholder || 'select item'}</p>

                            :
                            <div className="selected-box">
                                {value.map((item: ReactText, index: number) => {
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
                    </div>
                {/* {(messages && showError) && <span className="msg">{messages}</span>} */}
            </DropdownBlock>
        </InputWrapper>
    );
};

export default DropdownMulti;
