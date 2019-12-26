import React, { useState, SyntheticEvent, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import OutsideClickHandler from 'react-outside-click-handler';

interface OwnProps {
    name: string;
    onClickTrigger: (name: string) => void;
    onClose: (name: string) => void;
    trigger: any;
    contents: any;
    sameWidth?: boolean;
    contentsPosition?: 'right' | 'left';
    target: string;
    className?: string;
}
type Props = OwnProps;

const Popup = ({
    name, trigger, contents, sameWidth = false, contentsPosition = 'left',
    className, target, onClickTrigger, onClose
}: Props) => {
    const handleClickTrigger = () => {
        console.log(`${name}'s target: `, target);
        if (target === name) {
            onClose(name);
        } else {
            onClickTrigger(name);
        }
    }
    const handleClickOutside = () => {
        if(target === name) {
            console.log(`${name} outside`);
            onClose(name)
        }
    }
    return (
        <PopupBlock className={className}>
            <OutsideClickHandler
                onOutsideClick={handleClickOutside}
            >
                <Trigger onClick={handleClickTrigger}>
                    {trigger}
                </Trigger>
                {(target === name) &&
                    <Contents
                        sameWidth={sameWidth}
                        contentsPosition={contentsPosition}
                    >
                        {contents}
                    </Contents>
                }
            </OutsideClickHandler>


        </PopupBlock>
    )
}

const Trigger = styled.div`
    height: 100%;
`;

const Contents = styled.div<{ sameWidth: boolean, contentsPosition: string }>`
    
    position: absolute;
    z-index: 2;
    background: white;
    ${utils.shadow};
    ${props => props.contentsPosition === 'right'
        ? css`right:0;`
        : css`left:0;`
    };
    ${props => props.sameWidth && css`width:100%;`};
`;

const PopupBlock = styled.div`
    ${utils.initiateCss};
    width: fit-content;
    position: relative;

    /* OutsideClickHandler */
    >div:first-child {
        height: 100%;
    }
`;

export default Popup;