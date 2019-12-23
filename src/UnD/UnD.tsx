import React from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const UnDBlock = styled.p`
    ${flex.row};
`;

interface OwnProps {
    value:boolean|string;
}
type Props = OwnProps;

const UnD: React.SFC<Props> = ({value}) => {
    return (
        <UnDBlock>
            {value
                ?<FaAngleUp/>
                :<FaAngleDown/>
            }
        </UnDBlock>
    )
}

export default UnD;