import React, { useState, SyntheticEvent, useEffect, useRef, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import { useOnClickOutside } from '../hooks';

interface OwnProps {
    /** Name of popup: If it's same with `target`, `contents` will be shown.*/
    name: string;
    /** This function has to be able to control the target value */
    setTarget: (target: string) => void;
    /** It's changed by `setTarget`. If it's same with `name`, `contents` will be shown.*/
    target: string;
    trigger: ReactNode;
    contents: ReactNode;
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
    className, style, target, setTarget
    // onClickTrigger, onClose,
}: Props) => {
    const handleClickTrigger = () => {
        if (target === name) {
            setTarget("");
        } else {
            setTarget(name);
        }
    }
    const handleClickOutside = () => {
        if (target === name) {
            setTarget("")
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
    display: table;
    position: relative;

    /* OutsideClickHandler */
    >div:first-child {
        height: 100%;
    }
`;

export default Popup;