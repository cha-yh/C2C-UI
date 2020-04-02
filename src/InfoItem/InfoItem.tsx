import React from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

interface OwnProps {
    value: any;
    label: string;
    labelWidth?: number;
    row?: boolean;
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
}
type Props = OwnProps;

const InfoItem = ({
    value, label, labelWidth = 0, row = false,
    className, style
}: Props) => {
    let existValue = false;
    if (value) {
        existValue = true;
    } else {
        if (value === 0) {
            existValue = true;
        } else {
            existValue = false;
        }
    }

    return (
        <InfoItemBlock row={row} labelWidth={labelWidth} className={className} style={style}>
            <InfoLabel>{label}</InfoLabel>
            {existValue
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
        white-space:normal;
    }

    >.no_data {
        font-weight: 300;
        color: gray;
        font-style: italic;
        font-size: ${rem(16)};
    }
`

export default InfoItem;