import React, { useRef, useEffect, useState } from 'react';
import InfoItem, { InfoLabel } from '../InfoItem/InfoItem';
import styled from 'styled-components';
import {rem, flex, media} from '../utils';

type InfoGroupProps = {
    infos: {
        label: string;
        value: string;
    }[],

    infos2?: {
        label: string;
        value: string;
    }[];
}
const InfoGroup = ({infos, infos2}:InfoGroupProps) => {
    const label1Ref = useRef<HTMLDivElement>(null);
    const label2Ref = useRef<HTMLDivElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const [label2Width, setLabel2Width] = useState(0);
    useEffect(() => {
        label1Ref.current &&
            setLabelWidth(label1Ref.current.clientWidth);

        label2Ref.current &&
            setLabel2Width(label2Ref.current.clientWidth);
    }, [])
    return (
        <InfoGroupBlock>
            <WidthFixer ref={label1Ref}>
                {infos.map(item => 
                    <InfoLabel>{item.label}</InfoLabel>
                )}
            </WidthFixer>
            {infos2 && <WidthFixer ref={label2Ref}>
                {infos2.map(item => 
                    <InfoLabel>{item.label}</InfoLabel>
                )}
            </WidthFixer>}
            <InfoGroupBox >
                {infos.map(item => 
                     <InfoItem
                        row
                        value = {item.value}
                        label = {item.label}
                        labelWidth = {labelWidth>label2Width?labelWidth:label2Width}
                    />
                )}
            </InfoGroupBox>

            {infos2 &&
                <InfoGroupBox >
                    {infos2.map(item => 
                        <InfoItem
                            row
                            value = {item.value}
                            label = {item.label}
                            labelWidth = {labelWidth>label2Width?labelWidth:label2Width}
                        />
                    )}
                </InfoGroupBox>
            }
        </InfoGroupBlock>
        
    )
}
const WidthFixer = styled.div`
    width: fit-content;
    height: 0;
    visibility: hidden;
    position: absolute;
`;

const InfoGroupBox = styled.div`
    > div + div {
        margin-top: ${rem(10)};
    }
`;

const InfoGroupBlock = styled.div`
    ${flex.row};
    > div + div {
        margin-right: ${rem(20)};
        margin-bottom: ${rem(10)};
    }

    @media ${media.MEDIUM} {
        ${flex.col};
        
    }
`;

export default InfoGroup;