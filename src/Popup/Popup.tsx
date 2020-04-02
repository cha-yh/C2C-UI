import React, { useState, SyntheticEvent, useEffect, useRef, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import { useOnClickOutside } from '../hooks';

interface OwnProps {
    name: string;
    onClickTrigger: (name: string) => void;
    onClose: (name: string) => void;
    trigger: ReactNode;
    contents: ReactNode;
    target: string;
    sameWidth?: boolean;
    contentsPosition?: 'right' | 'left';
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
}
type Props = OwnProps;

const Popup = ({
    name, trigger, contents, sameWidth = false, contentsPosition = 'left',
    className, target, onClickTrigger, onClose, style
}: Props) => {
    const handleClickTrigger = () => {
        // console.log(`${name}'s target: `, target);
        if (target === name) {
            onClose(name);
        } else {
            onClickTrigger(name);
        }
    }
    const handleClickOutside = () => {
        if (target === name) {
            console.log(`${name} outside`);
            onClose(name)
        }
    }

    const ref = useRef(null);
    useOnClickOutside(ref, () => handleClickOutside());
    return (
        <PopupBlock className={className} ref={ref} style={style}>
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