import React from 'react'
import styled from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import TinyCircle from './TinyCircle';
export type LabelProps = {
    text: string;
    require?: boolean;
};
const LabelBlock = styled.h5`
    color: ${palette.grayDarken30};
    font-size: ${rem(14)};
    font-weight: 600;
    margin-bottom: ${rem(5)};
`;



const Label = ({ text, require }:LabelProps) => {
    return (
        <LabelBlock>
            {text} {require && <TinyCircle />}
        </LabelBlock>
    )
}

export default Label;