import React, { useState } from 'react';
import InfoItem from './InfoItem';
import { withKnobs, text, boolean, radios, number } from '@storybook/addon-knobs';

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

            <InfoItem
                label={"label"}
                value={"value"}
                row={true}
                labelWidth={labelWidth}
            />

            <InfoItem
                label={"a"}
                value={"b"}
                row
                labelWidth={labelWidth}
            />
        </React.Fragment>
    );
};

infoItem.story = {
    name: 'Default'
};