import React, { useState } from 'react';
import InfoGroup from './InfoGroup';
import { withKnobs, text, boolean, radios, number } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { flex } from '../utils';

export default {
    title: 'components|InfoGroup',
    component: InfoGroup,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const infoGroup = () => {
    return (
        <InfoGroupBlock>
            <InfoGroup
                infos={[
                    {value: 'lorem ipsum dolor sit amet', label: 'l'},
                    {value: 't2', label: 'la'},
                    {value: 'test1', label: 'label1123123'},
                    {value: 'tes1', label: 'lab'}
                ]}

                // infos2={[
                //     {value: 'lorem ipsum dolor shit lorem', label: 'l123'},
                //     {value: 't2', label: 'la123'},
                //     {value: 'test1', label: 'label1123123123'},
                //     {value: 'tes1', label: 'lab'}
                // ]}
            />
        </InfoGroupBlock>
    );
};

const InfoGroupBlock = styled.div`
    ${flex.row};
    ${flex.wrap};
`;

infoGroup.story = {
    name: 'Default'
};