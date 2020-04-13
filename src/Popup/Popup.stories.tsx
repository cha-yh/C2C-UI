import React, { useState } from 'react';
import Popup from './Popup';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import Button from '../Button/Button';
import { Box } from '../storyStyle';
export default {
    title: 'components|Popup',
    component: Popup,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const popup = () => {
    const [target, setTarget] = useState("");

    const sameWidth = boolean('sameWidth', false);
    const contentsPosition = radios(
        'contentsPosition',
        { Right: 'right', Left: 'left' },
        'left'
    );
    return (
        <React.Fragment>
            <Popup
                name="test1"
                trigger={
                    <Button>trigger</Button>
                }
                contents={
                    <p style={{ padding: '10px', background: 'gray' }}>contents</p>
                }
                sameWidth={sameWidth}
                contentsPosition={contentsPosition}
                target={target}
                setTarget={(target: string) => {
                    setTarget(target);
                }}
            />
        </React.Fragment>
    );
};

export const options = () => {
    const [target, setTarget] = useState("");
    return (
        <Box>
            <h5>contents position</h5>
            <div style={{ display: 'flex' }}>
                <Popup
                    name="test2"
                    trigger={
                        <Button theme="secondary">{`contentsPosition={'left'}`}</Button>
                    }
                    contents={
                        <p style={{ whiteSpace: 'nowrap', padding: '10px', background: 'blue', color: 'white' }}>lorem inpsum dolor sh ls lorem ipsum</p>
                    }
                    contentsPosition='left'
                    target={target}
                    setTarget={(target: string) => {
                        setTarget(target);
                    }}
                    style={{ marginRight: '20px' }}
                />
                <Popup
                    name="test1"
                    trigger={
                        <Button theme="secondary">{`contentsPosition={'right'}`}</Button>
                    }
                    contents={
                        <p style={{ padding: '10px', background: 'green' }}>lorem inpsum dolor</p>
                    }
                    contentsPosition='right'
                    target={target}
                    setTarget={(target: string) => {
                        setTarget(target);
                    }}
                />

            </div>

            <h5>same width</h5>
            <Popup
                name="test3"
                trigger={
                    <Button theme="secondary">{`sameWidth={true}`}</Button>
                }
                contents={
                    <p style={{ padding: '10px', background: 'green' }}>lorem inpsum dolor sh ls lorem ipsum</p>
                }
                target={target}
                sameWidth={true}
                setTarget={(target: string) => {
                    setTarget(target);
                }}
            />
        </Box>
    )
}

popup.story = {
    name: 'Default'
};