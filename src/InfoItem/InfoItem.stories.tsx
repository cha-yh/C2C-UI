import React, { useState } from 'react';
import InfoItem from './InfoItem';
import { withKnobs, text, boolean, radios, number } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { rem, palette } from '../utils';

export default {
    title: 'components|InfoItem',
    component: InfoItem,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const infoItem = () => {
    const row = boolean('row', false);
    const label = text('label', 'country');
    const value = text('value', 'Republic of Korea');
    const labelWidth = number('labelWidth', null);
    return (
        <React.Fragment>
            <InfoItem
                label={label}
                value={value}
                row={row}
                labelWidth={labelWidth}
            />
        </React.Fragment>
    );
};

export const direction = () => {
    return (
        <Box>
            <h5>{`row={true}`}</h5>
            <InfoItem
                label={'label'}
                value={'value'}
                row={true}
            />

            <h5>{`row={false}`}</h5>
            <InfoItem
                label={'label'}
                value={'value'}
                row={false}
            />
        </Box>
    )
}

export const labelWidth = () => {
    return (
        <Box>
            <h5>{`row={true} labelWidth={200}`}</h5>
            <InfoItem
                label={'lorem'}
                value={'value1'}
                row={true}
                labelWidth={200}
            />
            <InfoItem
                label={'lorem ipsum'}
                value={'value2'}
                row={true}
                labelWidth={200}
            />
            <InfoItem
                label={'lo'}
                value={'value3'}
                row={true}
                labelWidth={200}
            />

            <h5>{`row={false} labelWidth={100}`}</h5>
            <InfoItem
                label={'lor'}
                value={'value1'}
                row={true}
                labelWidth={100}
            />
            <InfoItem
                label={'lorem ipsum'}
                value={'value2'}
                row={true}
                labelWidth={100}
            />
            <InfoItem
                label={'lorem'}
                value={'value3'}
                row={true}
                labelWidth={100}
            />
        </Box>
    )
}

const Box = styled.div`
    >h5 {
        margin: 0;
        margin-top: ${rem(20)}; 
        color: ${palette.blue700};
        font-size: ${rem(24)};
    }
`;

infoItem.story = {
    name: 'Default'
};