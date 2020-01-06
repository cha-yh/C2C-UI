import React from 'react'
import styled from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import Spinner from 'react-loader-spinner';
const LoaderBlock = styled.div<{ size: number, noMargin:boolean|undefined }>`
    width: fit-content;
    height:${props => props.size && rem(props.size)};    
    margin: ${props => props.noMargin ?'0' :'0 auto'};

    >div {
        height:${props => props.size && rem(props.size)};
        width: fit-content;
    }
`;
type Types =
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified';

interface OwnProps {
    type?: Types;
    color?: string;
    size?: number;
    noMargin?: boolean;
}
type Props = OwnProps;

const Loader: React.SFC<Props> = ({
    type = "Oval",
    color = "#ffffff",
    size = 26,
    noMargin
}) => {
    return (
        <LoaderBlock size={size} noMargin={noMargin}>
            <Spinner
                type={type}
                color={color}
                height={size}
                width={size}
            />
        </LoaderBlock>
    )
}

export default Loader;