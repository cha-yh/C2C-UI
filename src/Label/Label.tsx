import React from 'react'
import styled from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import TinyCircle from './TinyCircle';
export type LabelProps = {
    text: string;
    required?: boolean;
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
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



const Label = ({ text, required, style, className }: LabelProps) => {
    return (
        <LabelBlock style={style} className={className}>
            {text} {required && <TinyCircle title={"required"} />}
        </LabelBlock>
    )
}

export default Label;