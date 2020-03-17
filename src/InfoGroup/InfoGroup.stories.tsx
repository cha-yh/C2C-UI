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
                    {
                        label: "zero",
                        value: 0
                    },
                    {
                        label: "empty",
                        value: ""
                    },
                    {
                        label: "undefined",
                        value: undefined
                    },
                    {
                        label: "null",
                        value: null
                    },
                    {
                        label: "text",
                        value: "lorem ipsum do"
                    }
                ]}
            />

<InfoGroup
                infos={[
                    {
                        label: "Origin",
                        value: "lorem ipsum do"
                    },
                    {
                        label: "Region",
                        value: "lorem ipsum do"
                    },
                    {
                        label: "Altitude",
                        value: "lorem ipsum do"
                    },
                    {
                        label: "Temperature",
                        value: "lorem ipsum do"
                    },
                    {
                        label: "Soil",
                        value: "lorem ipsum do"
                    },
                    {
                        label: "Annual rainfall",
                        value: "lorem ipsum do"
                    }
                ]}
            />
        </InfoGroupBlock>
    );
};

const InfoGroupBlock = styled.div`
    ${flex.row};
    width: 1080px;

    >div {
        flex: 1 0 auto;
    }
`;

infoGroup.story = {
    name: 'Default'
};