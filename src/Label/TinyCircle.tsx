import React from 'react'
import styled from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

const TinyCircleBlock = styled.div<{white:boolean|undefined, color:string|undefined}>`
    width: ${rem(6)};
    height: ${rem(6)};
    background-color: ${palette.blue500};
    background-color: ${props=>props.white && 'white'};
    background-color: ${props=>props.color && props.color};
    border-radius: ${rem(100)};
    display: inline-block;
    margin-left: ${rem(5)};
    margin-bottom: ${rem(1)};
`;

interface OwnProps {
    white?:boolean;
    color?:string;
}
type Props = OwnProps;

const TinyCircle: React.SFC<Props> = ({white, color}) => {
    return (
        <TinyCircleBlock
            white={white}
            color={color}
        />
    )
}

export default TinyCircle;