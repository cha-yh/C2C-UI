import React, { ReactText, useRef, useState, useCallback, memo, useEffect, useMemo } from 'react';
import _ from 'lodash';
import InputWrapper, { getInputStatus } from '../InputWrapper/InputWrapper';
import { useOnClickOutside } from '../hooks';
import UnD from '../UnD/UnD';
import { MdClose } from 'react-icons/md';
import { SelectedItemBlock, SelectBlock } from './SelectStyles';
import cx from 'classnames';
import SelectList from './SelectList';

type Value = string | number | string[] | undefined;
interface OwnProps {
    onChange: (name: string, value: any) => void;
    name: string;
    value: string | number | string[] | undefined | null;
    options: Array<{ key: ReactText, value: ReactText, text: string }>;
    label?: string;
    width?: string;
    searchable?: boolean;
    height?: string;
    multiple?: boolean;

    checkError?: (name: string, value: string | number | string[]) => void;
    messages?: string[];
    /**When the focus of Dropdown component is out, it will be shown*/
    errorMessages?: string[];

    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
    /** The option you can input directly instead of selection */
    typeable?: boolean;
    typeablePlaceholder?: string;
}

type Props = OwnProps;

const Select = memo(({
    onChange, name, value, options, required,
    disabled, label, width, searchable,
    placeholder, multiple, height,
    checkError, messages, errorMessages,
    style, className, typeable, typeablePlaceholder
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [showError, setShowError] = useState(false);
    const [focus, setFocus] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const closeList = useCallback((focus: boolean, value: any) => {
        if (focus) {
            setFocus(false);
            setShowError(true);
            checkError && checkError(name, value);
        }
    }, []);

    
    const isUpper = React.useMemo(() => {
        const top = ref.current?.getBoundingClientRect().top ? ref.current?.getBoundingClientRect().top : 0;
        const _isUpper = window.innerHeight/2 > top;
        return _isUpper;
    }, [ref.current?.getBoundingClientRect()]);

    const handleDivClick = () => {
        if (disabled) {
            return;
        }
        if (focus) {
            closeList(focus, value);
        } else {
            setFocus(true);
        }
    };

    const inputStatus = getInputStatus(focus, showError, disabled, errorMessages);

    
    useOnClickOutside(ref, () => closeList(focus, value));


    const handleClickItem = (itemValue: any) => {
        if (multiple && typeof value === 'object') {
            const copy = value?[...value]:[];
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
            checkError && checkError(name, copy);
        } else {
            onChange && onChange(name, itemValue);
            closeList(focus, itemValue);
        }
    }

    const removeBlock = (e: React.MouseEvent<SVGElement, MouseEvent>, itemValue: any) => {
        if (disabled) {
            return;
        } else if (multiple && typeof value === 'object') {
            e.stopPropagation();
            const copy = value?[...value]:[];
            _.remove(copy, (item: any) => {
                return item === itemValue;
            })
            onChange(name, copy);
            checkError && checkError(name, copy);
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
            messages={messages}
            errorMessages={errorMessages}
            showError={showError}
            className={className}
            style={style}
        >
            <SelectBlock
                inputStatus={inputStatus}
                ref={ref}
                height={height}
                isUpper={isUpper}
            >
                <div className="select-body" onClick={handleDivClick}>
                    {/* input tag for checking required throgh form field */}
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }}
                        name={name} value={value?value:""}
                        required={required} placeholder={placeholder}
                    />
                    {(multiple)
                        ?
                        <>
                            {(typeof value === 'object' && value)
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
                                                    let itemText = item;
                                                    if(itemIndex !== -1) {
                                                        itemText = options[itemIndex].text;
                                                    }
                                                    return (
                                                        <SelectedItemBlock
                                                            key={`${item}-${index}`}
                                                            inputStatus={inputStatus}
                                                        >
                                                            <h5>{itemText}</h5>
                                                            <MdClose onClick={(e) => removeBlock(e, item)} />
                                                        </SelectedItemBlock>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    }
                                </>

                                :
                                <p className="placeholder">{placeholder||"Data is null"}</p>
                            }

                            
                        </>
                        :
                        <p className={cx("placeholder", { 'selected': value })}>
                            {_.find(options, function (o) { return o.value === value; })?.text || value || placeholder}
                        </p>

                    }
                    <UnD value={focus} />
                </div>

                {focus &&
                    <SelectList
                        focus={focus}
                        searchable={searchable}
                        handleInputChange={handleInputChange}
                        inputValue={inputValue}
                        removeSearchValue={removeSearchValue}
                        options={options}
                        multiple={multiple}
                        value={value}
                        handleClickItem={handleClickItem}
                        typeable={typeable}
                        typeablePlaceholder={typeablePlaceholder}
                        isUpper={isUpper}
                    />
                }
            </SelectBlock>
        </InputWrapper>
    )
}, ((prevProps: Readonly<React.PropsWithChildren<OwnProps>>, nextProps: Readonly<React.PropsWithChildren<OwnProps>>) => {    
    return _.isEqual(prevProps,nextProps);
}))

export default Select;