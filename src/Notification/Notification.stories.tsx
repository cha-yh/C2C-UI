import React, { useState } from 'react';
import Notification from './Notification';
import { withKnobs, text, boolean, radios, number } from '@storybook/addon-knobs';
import Button from '../Button/Button';
export default {
    title: 'components|Notification',
    component: Notification,
    parameters: {
        docs: {
            inlineStories: false
        }
    },
    decorators: [withKnobs]
};

export const notification = () => {
    const theme = radios(
        'theme',
        {
            Success: 'success',
            Failure: 'failure',
            Normal: 'normal'
        },
        'normal'
    );
    const duration = number('duration', 7000);
    const title = text('title', 'Title');
    const [visible, setVisible] = useState(true);
    const handleOpen = () => {
        setVisible(true);
    }
    const handleClose = () => {
        setVisible(false);
    }
    return (
        <React.Fragment>
            <Button onClick={handleOpen}>toggle</Button>
            <Notification
                visible = {visible}
                onOpen = {handleOpen}
                onClose = {handleClose}
                duration={duration}
                title={title}
                failure={theme==='failure'}
                success={theme==='success'}
                contents={
                    <div style={{color: 'white'}}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, expedita.</p>
                    </div>
                }
            />
        </React.Fragment>
    );
};

notification.story = {
    name: 'Default'
};