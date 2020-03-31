import React, { ReactText, useRef, useState, useCallback } from 'react';
import _ from 'lodash';
import InputWrapper from '../InputWrapper/InputWrapper';
import { useOnClickOutside } from '../hooks';
import UnD from '../UnD/UnD';
import Input from '../Input/Input';
import { MdSearch, MdClose } from 'react-icons/md';
import Scrollbars from 'react-custom-scrollbars';
import CheckBox from '../CheckBox/CheckBox';
import {SelectedItemBlock, ListItemBlock, SelectBlock} from './SelectStyles';
import cx from 'classnames';

type Value = string | number | string[] | undefined;
interface OwnProps {
    onChange: (name: string, value: string | number | string[]) => void;
    name: string;
    value: string | number | string[];
    options: Array<{ key: ReactText, value: ReactText, text: string }>;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    width?: string;
    searchable?: boolean;
    placeholder?: string;
    multiple?: boolean;
    height?: string;
}

type Props = OwnProps;

const Select = ({
    onChange, name, value, options, required,
    disabled, label, width, searchable,
    placeholder, multiple, height
}:Props) => {
    const [focus, setFocus] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const closeList = useCallback((focus: boolean) => {
        if (focus) {
            setFocus(false);
        }
    }, []);

    const handleDivClick = () => {
        if (disabled) {
            return;
        }
        setFocus(!focus);
    };

    const inputStatus = () => {
        if (focus) {
            return 'focus';
        }
        if (disabled) {
            return 'disabled';
        }

        return null;

    }

    const ref = useRef(null);
    useOnClickOutside(ref, () => closeList(focus));

    const handleClickItem = (itemValue: any) => {
        if (multiple && typeof value === 'object') {
            const copy = [...value];
            const exist = copy.some((item: ReactText) => {
                return item === itemValue;
            });
            if (exist) {
                _.remove<ReactText>(copy, (item: any) => {
                    return item === itemValue
                })

                onChange(name, copy);

            } else {
                copy.push(itemValue);
                onChange(name, copy);
            }
        } else {
            onChange && onChange(name, itemValue);
            closeList(focus);
        }
    }

    const removeBlock = (e: React.MouseEvent<SVGElement, MouseEvent>, itemValue: any) => {
        if (disabled) {
            return;
        } else if (typeof value === 'object') {
            e.stopPropagation();
            const copy = [...value];
            _.remove(copy, (item: any) => {
                return item === itemValue;
            })
            onChange(name, copy);
        }
    }

const removeSearchValue = () => {
    setInputValue('');
}
    return (
        <InputWrapper
            label={label}
            required={required}
            width={width}
        >
            <SelectBlock inputStatus={inputStatus()} ref={ref} height={height}>
                <div className="select-body" onClick={handleDivClick}>
                    {/* for checking required throgh form field */}
                    <input
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {}}
                        name={name} value={value}
                        required={required} placeholder={placeholder}
                    />
                    {(multiple && typeof value === 'object')
                        ?
                        <>
                            {value.length === 0
                                ?
                                <p className="placeholder">{placeholder}</p>

                                :
                                <>
                                    
                                    <div className="selected-box">
                                        {value.map((item: ReactText, index: number) => {
                                            const itemIndex = _.findIndex(options, (o: any) => {
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
                                </>
                            }
                        </>
                        :
                        <p className={cx("placeholder", { 'selected': value})}>
                            {_.find(options, function(o) { return o.value === value; })?.text || placeholder} 
                        </p>

                    }
                    <UnD value={focus} />
                </div>

                <div className="select-list">
                    {searchable &&
                        <Input
                            onChange={handleInputChange}
                            value={inputValue}
                            icon={inputValue 
                                ?<MdClose onClick={removeSearchValue} style={{cursor:'pointer'}}/> 
                                :<MdSearch />
                            }
                            placeholder="Enter the search word"
                        />
                    }
                    <div className="list-wrapper">
                        <Scrollbars>
                            {options.map(item => {
                                if (_.includes(item.text.toLowerCase(), inputValue.toLowerCase())) {
                                    return (
                                        <ListItemBlock
                                            multiple={multiple?multiple:false}
                                            onClick={() => { handleClickItem(item.value); }}
                                            key={item.value}
                                        >
                                            {multiple && typeof value === 'object' && <CheckBox checked={value.some((innerItem:any) => { return innerItem === item.value })} />}
                                            <p className="item">{item.text}</p>
                                        </ListItemBlock>
                                    )
                                }
                            })}
                        </Scrollbars>
                    </div>
                </div>
            </SelectBlock>
        </InputWrapper>
    )
}

export default Select;