import React, { ReactText, memo } from 'react'
import styled, { css } from 'styled-components';
import { ListItemBlock } from './SelectStyles';
import Scrollbars from 'react-custom-scrollbars';
import CheckBox from '../CheckBox/CheckBox';
import _ from 'lodash';
import { rem, utils, flex, palette } from '../utils';

interface OwnProps {
    value: string | number | string[] | undefined | null;
    options: Array<{ key: ReactText, value: ReactText, text: string }>;
    multiple?: boolean;
    handleClickItem: (itemValue: any) => void;
    inputValue: string;
}
type Props = OwnProps;

const OptionList: React.SFC<Props> = memo(({options, multiple, value, handleClickItem, inputValue}) => {
    return (
        <OptionListBlock>
            <Scrollbars>
                {options.map(item => {
                    if (_.includes(item.text.toLowerCase(), inputValue.toLowerCase())) {
                        console.log('item', item);
                        return (
                            <ListItemBlock
                                multiple={multiple ? multiple : false}
                                onClick={() => { handleClickItem(item.value); }}
                                key={`${item.value}${item.key}`}
                            >
                                {multiple &&
                                    <>
                                        {(value && typeof value === 'object')
                                            ?
                                            <CheckBox checked={value.some((innerItem: any) => { return innerItem === item.value })} />

                                            :
                                            <CheckBox checked={false} />
                                        }
                                    </>
                                }
                                <p className="item">{item.text}</p>
                            </ListItemBlock>
                        )
                    }
                })}
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

export default OptionList;