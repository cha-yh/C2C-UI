import React, { ReactText, memo, useState, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { ListItemBlock } from './SelectStyles';
import Scrollbars from 'react-custom-scrollbars';
import CheckBox from '../CheckBox/CheckBox';
import _ from 'lodash';
import { rem, utils, flex, palette } from '../utils';
import cx from 'classnames';
import { MdAdd, MdCheck } from 'react-icons/md';

interface OwnProps {
    value: string | number | string[] | undefined | null;
    options: Array<{ key: ReactText, value: ReactText, text: string }>;
    multiple?: boolean;
    handleClickItem: (itemValue: any) => void;
    inputValue: string;
    typeable?: boolean;
    typeablePlaceholder?: string;
}
type Props = OwnProps;

const OptionList: React.SFC<Props> = memo(({
    options, multiple, value, handleClickItem,
    inputValue, typeable, typeablePlaceholder
}) => {
    /** Typeable */
    const optionValues = options.map(item => item.value);
    let defaultSingleTypeableValue: ReactText | undefined = undefined;
    let defaultMulitiTypeableValue: ReactText[] = [];
    let _value = undefined;
    if (multiple) {
        _value = (typeof value === 'object' && value !== null) ? value : [];
        _value.forEach(element => {
            const index = _.findIndex(optionValues, ov => ov === element);
            if (index === -1) {
                defaultMulitiTypeableValue.push(element);
            }
        });
    } else {
        const compareValue: ReactText|undefined = (typeof value === 'string' || typeof value === 'number') ? value : undefined;
        _value = compareValue;
        if (_.findIndex(optionValues, ov => ov === compareValue) === -1) {
            defaultSingleTypeableValue = _value;
        }
    }
    const [singleTypeableValue, setSingleTypeableValue] = useState<ReactText | undefined>(defaultSingleTypeableValue);
    const [multiTypeableValue, setMultiTypeableValue] = useState<ReactText[]>(defaultMulitiTypeableValue);
    const [multiTypeableTextValue, setMultiTypeableTextValue] = useState<ReactText | undefined>(undefined);
    const handleChangeSingleTypeableValue = (e: any) => {
        setSingleTypeableValue(e.target.value);
    }

    const handleChangeMultiTypeableTextValue = (e: any) => {
        setMultiTypeableTextValue(e.target.value)
    }
    const addTypeableValue = (_value: any) => {
        if (_value !== "") {
            const tempArray = [...multiTypeableValue];
            tempArray.push(_value);
            setMultiTypeableValue(tempArray);

            handleClickItem(_value);

            setMultiTypeableTextValue("");
        }
    }

    useEffect(() => {
        return () => {
            setMultiTypeableValue([]);
            setSingleTypeableValue(undefined);
        }
    }, [])

    return (
        <OptionListBlock>
            <Scrollbars>
                {options.map(item => {
                    if (_.includes(item.text.toLowerCase(), inputValue.toLowerCase())) {
                        return (
                            <ListItemBlock
                                multiple={multiple ? multiple : false}
                                onClick={() => { handleClickItem(item.value); }}
                                key={`${item.value}${item.key}`}
                            >
                                {multiple
                                    ?
                                    <>
                                        {(value && typeof value === 'object')
                                            ?
                                            <>
                                                <CheckBox checked={value.some((innerItem: any) => { return innerItem === item.value })} />
                                                <p className={cx('item', { 'select': value.some((innerItem: any) => { return innerItem === item.value }) })}>{item.text}</p>
                                            </>


                                            :
                                            <>
                                                <CheckBox checked={false} />
                                                <p className={cx('item')}>{item.text}</p>
                                            </>
                                        }
                                    </>

                                    :
                                    <p className={cx('item', { 'select': value === item.value })}>{item.text}</p>
                                }
                            </ListItemBlock>
                        )
                    }
                })}
                {typeable &&
                    // <p className="item">Direct Input</p>
                    <>
                        {multiple
                            ?
                            <TypeableSection>
                                {multiTypeableValue.length
                                    ?
                                    <>
                                        {multiTypeableValue.map((item, index) => {
                                            return (
                                                <>
                                                    <ListItemBlock
                                                        key={index}
                                                        multiple={multiple}
                                                        onClick={() => { handleClickItem(item); }}
                                                    >
                                                        {(value && typeof value === 'object')
                                                            ?
                                                            <>
                                                                <CheckBox
                                                                    checked={value.some((innerItem: any) => { return innerItem === item })}
                                                                />
                                                                <p className={cx('item', { 'select': value.some((innerItem: any) => { return innerItem === item }) })}>{item}</p>
                                                            </>

                                                            :
                                                            <>
                                                                <CheckBox checked={false} />
                                                                <p className={cx('item')}>{item}</p>
                                                            </>
                                                        }
                                                    </ListItemBlock>
                                                </>
                                            )
                                        })}
                                    </>

                                    :
                                    null
                                }
                                <TypeableBox style={{ marginTop: '10px' }}>
                                    <input
                                        type="text"
                                        value={multiTypeableTextValue}
                                        onChange={(e) => { handleChangeMultiTypeableTextValue(e) }}
                                        placeholder={typeablePlaceholder && typeablePlaceholder}
                                    />
                                    <button
                                        disabled={multiTypeableTextValue === ""}
                                        onClick={() => { addTypeableValue(multiTypeableTextValue); }}
                                    >
                                        <MdAdd />
                                    </button>
                                </TypeableBox>
                            </TypeableSection>
                            :
                            <TypeableSection>
                                <TypeableBox>
                                    <input
                                        type="text"
                                        value={singleTypeableValue}
                                        onChange={handleChangeSingleTypeableValue}
                                        placeholder={typeablePlaceholder && typeablePlaceholder}
                                        className={cx({"selected": singleTypeableValue === value})}
                                    />
                                    <button onClick={() => { handleClickItem(singleTypeableValue); }}><MdCheck /></button>
                                </TypeableBox>
                            </TypeableSection>

                        }
                    </>
                }

            </Scrollbars>
        </OptionListBlock>
    )
})

const OptionListBlock = styled.div`
    padding-top: ${rem(10)};

    /** Scrollbar */
    >div {
        >div:first-child {
            max-height: 12.5rem !important;
            /* min-height: 7rem !important; */
            min-height: 100% !important;
            position: unset !important;
            /* overflow-x: auto !important; */
            /* height: 100% !important; */
        }
    }
`;
const TypeableSection = styled.section`
    margin-top: 1rem;
    margin-right: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${palette.blue500};

`;

const TypeableBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    >input {
        width: calc(100% - 60px);
        height: 30px;
    }

    >input.selected {
        color: ${palette.blue500};
        font-weight: 700;
    }
    >button {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default OptionList;