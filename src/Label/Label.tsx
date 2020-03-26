import React from 'react'
import styled from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import TinyCircle from './TinyCircle';
export type LabelProps = {
    text: string;
    required?: boolean;
};
const LabelBlock = styled.h5`
    color: ${palette.gray800};
    font-size: ${rem(14)};
    font-weight: 600;
    margin-bottom: ${rem(5)};

    ${flex.row};
    ${flex.ai.center};

    >div {
        cursor: help;
    }
`;



const Label = ({ text, required }:LabelProps) => {
    return (
        <LabelBlock>
            {text} {required && <TinyCircle title={"required"}/>}
        </LabelBlock>
    )
}

export default Label;