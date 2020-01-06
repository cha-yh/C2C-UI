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
            <p className="label">{label}</p>
            {value
                ?
                <h5>{value}</h5>

                :
                <p className="no_data">NO DATA</p>
            }
        </InfoItemBlock>
    )
}

const InfoItemBlock = styled.div<{ row: boolean, labelWidth: number }>`
    ${utils.initiateCss};
    ${props =>
        props.row &&
        css`
            ${flex.row};
            /* ${flex.wrap}; */
            >:first-child {
                ${flex.flex('none')};
            }

            >.label {
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

    >h5 {
        white-space: initial;
        font-size: ${rem(16)};
    }

    >.no_data {
        font-weight: 300;
        color: gray;
        font-style: italic;
        font-size: ${rem(16)};
    }
`

export default InfoItem;