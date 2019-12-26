import React, { useState } from 'react';
import Popup from './Popup';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import Button from '../Button/Button';
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
    const [target, setTarget] = useState("q");
    const handleClick = (name: string) => {
        setTarget(name);
    }
    const handleClose = (name: string) => {
        if(target === name) {
            setTarget("");
        }
    }

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
                onClickTrigger={handleClick}
                onClose={handleClose}
            />

            <Popup
                name="test2"
                trigger={
                    <Button theme="tertiary">trigger2</Button>
                }
                contents={
                    <p style={{ padding: '10px', background: 'green' }}>dfjkljalkfjasklfdfjkljalkfjasklf dsfkljaslfkj dfkjadkldfj fklaj</p>
                }
                sameWidth={sameWidth}
                contentsPosition={contentsPosition}
                target={target}
                onClickTrigger={handleClick}
                onClose={handleClose}
            />
        </React.Fragment>
    );
};

popup.story = {
    name: 'Default'
};