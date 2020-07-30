import React from 'react'
import styled, { css } from 'styled-components';
import Input from '../Input/Input';

import { MdSearch, MdClose } from 'react-icons/md';
import { flex, palette, rem, utils } from '../utils';
import OptionList from './OptionList';
interface OwnProps {
    focus: boolean;
    searchable?: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    removeSearchValue: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
    options: {
        key: React.ReactText;
        value: React.ReactText;
        text: string;
    }[];
    multiple?: boolean;
    value: string | number | string[] | null | undefined;
    handleClickItem: (itemValue: any) => void;
    typeable?: boolean;
    typeablePlaceholder?: string;
    isUpper: boolean;

}
type Props = OwnProps;

const SelectList: React.SFC<Props> = ({
    focus,
    searchable,
    handleInputChange,
    inputValue,
    removeSearchValue,
    options,
    multiple,
    value,
    handleClickItem,
    typeable,
    typeablePlaceholder,
    isUpper
}) => {
    return (
        <TopFixed isUpper={isUpper}>
            <div className="relative">
                <SelectListBlock isUpper={isUpper} focus={focus}>
                    {searchable &&
                        <Input
                            onChange={handleInputChange}
                            value={inputValue}
                            icon={inputValue
                                ? <MdClose onClick={removeSearchValue} style={{ cursor: 'pointer' }} />
                                : <MdSearch />
                            }
                            placeholder="Enter the search word"
                            style={{marginTop: '1rem'}}
                        />
                    }
                    <OptionList
                        options={options}
                        multiple={multiple}
                        value={value}
                        handleClickItem={handleClickItem}
                        inputValue={inputValue}
                        typeable={typeable}
                        typeablePlaceholder={typeablePlaceholder}
                    />
                </SelectListBlock>
            </div>
        </TopFixed>
    )
}

const TopFixed = styled.div<{ isUpper: boolean }>`
    position: absolute;
    width: 100%;
    ${props => !props.isUpper && css`
        top: 0;
    `};

    >.relative {
        position: relative;
        width: 100%;
    }
`;

const SelectListBlock = styled.div<{ focus: boolean, isUpper: boolean }>`
    z-index: 1;
    width: 100%;
    border: 1px solid ${palette.gray400};
    padding: ${rem(10)};
    padding-top: 0;
    background: white;
    ${utils.shadow};
    position: absolute;
    display: none;

    ${props => (props.focus) && css`
        ${props.isUpper
            ?
            css`
                border-top: none;
            `

            :
            css`
                bottom: 0;
                border-bottom: none;
                box-shadow: 2px -2px 3px rgba(0,0,0,0.12);
            `
        };    
        display: block;
        opacity: 1;
        border-color: ${palette.blue500};
        
    `};
`;

export default SelectList;