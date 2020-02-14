import React from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

interface OwnProps {
    value: any,
    label: string,
    labelWidth?: number,
    row?: boolean
}
type Props = OwnProps;

const InfoItem = ({
    value, label, labelWidth = 0, row = false
}: Props) => {
    return (
        <InfoItemBlock row={row} labelWidth={labelWidth}>
            <InfoLabel>{label}</InfoLabel>
            {value
                ?
                <h5 className="value">{value}</h5>

                :
                <h5 className="no_data">NO DATA</h5>
            }
        </InfoItemBlock>
    )
}

export const InfoLabel = styled.h5`
    font-size: ${rem(12)} !important;
    font-weight: 300;
    white-space: nowrap;
`;

const InfoItemBlock = styled.div<{ row: boolean, labelWidth: number }>`
    ${utils.initiateCss};
    width: 100%;
    ${props =>
        props.row &&
        css`
            ${flex.row};
            ${flex.ai.center};
            /* ${flex.wrap}; */
            >:first-child {
                ${flex.flex('none')};
                margin-right:${rem(20)};
                ${ props.labelWidth
                    ? css`
                        width:${rem(props.labelWidth)};
                    `

                    : css`
                        width: initial;
                    `
                }
            }
        `
    };
    >.value {
        font-size: ${rem(16)};
        font-weight: 700;
    }

    >.no_data {
        font-weight: 300;
        color: gray;
        font-style: italic;
        font-size: ${rem(16)};
    }
`

export default InfoItem;