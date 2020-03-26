import React, { useState } from 'react';
import Popup from './Popup';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import Button from '../Button/Button';
import {Box} from '../storyStyle';
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
        </React.Fragment>
    );
};

export const options = () => {
    const [target, setTarget] = useState("");
    const handleClick = (name: string) => {
        setTarget(name);
    }
    const handleClose = (name: string) => {
        if(target === name) {
            setTarget("");
        }
    }
    return (
        <Box>
            <h5>contents position</h5>
            <div style={{display:'flex'}}>
                <Popup
                    name="test2"
                    trigger={
                        <Button theme="secondary">{`contentsPosition={'left'}`}</Button>
                    }
                    contents={
                        <p style={{ whiteSpace: 'nowrap',padding: '10px', background: 'blue', color: 'white' }}>lorem inpsum dolor sh ls lorem ipsum</p>
                    }
                    contentsPosition='left'
                    target={target}
                    onClickTrigger={() => {handleClick('test2')}}
                    onClose={() => {handleClose('test2')}}
                    style={{marginRight:'20px'}}
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
                    onClickTrigger={() => {handleClick('test1')}}
                    onClose={() => {handleClose('test1')}}
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
                onClickTrigger={() => {handleClick('test3')}}
                onClose={() => {handleClose('test3')}}
            />
        </Box>
    )
}

popup.story = {
    name: 'Default'
};