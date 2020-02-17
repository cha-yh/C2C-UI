import React, { useCallback, useState, forwardRef, useRef, useEffect, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import Label from '../Label/Label';
import { MdHelp } from 'react-icons/md';

type HelperProps = {
    trigger: ReactNode,
    messages: string[]
}
const Helper = ({trigger, messages}:HelperProps) => {
    return (
        <HelperBlock>
            {trigger}
            <Popup>
                <p>Check below validation messages</p>
                <ul>
                    {messages.map(item => {
                        console.log('item', item);
                        return <li>{item}</li>
                    })}
                </ul>
            </Popup>
        </HelperBlock>
    )
}
const HelperBlock = styled.div`
    position: relative;

    &:hover {
        >:nth-child(2) {
            display:block;
        }
    }
`;

const Popup = styled.div`
    display: none;
    margin-top: ${rem(5)};
    position: absolute;
    padding: ${rem(10)};
    background: black;
    opacity: 0.9;
    min-width: ${rem(250)};
    right: 0;
    color: white;
    z-index: 2;
    border-radius: ${rem(5)};
    >p {

    }

    >ul {
        padding-left: ${rem(20)};
        >li + li {
            margin-top: ${rem(5)};
        }
    }
`;

const Trigger = styled.div`
    ${flex.row};
    ${flex.ai.center};
    
    >p {
        margin-right: ${rem(5)};
        font-size: ${rem(13)};
        color: ${palette.red500};
    }

    >svg {
        font-size: ${rem(13)};
        color: ${palette.red500};
    }
`;

type InputWrapperProps = {
    children?: React.ReactNode,
    label?: string,
    required?: boolean,
    messages?: string[],
    showError?: boolean,
    errorMessages?: string[],
    width?: number;
}
const InputWrapper = forwardRef(
    ({
        children,
        label,
        required,
        messages,
        showError,
        errorMessages=[],
        width
    }:InputWrapperProps,
    ref?: React.Ref<HTMLInputElement>) => {
        const [inputWidth, setInputWidth] = useState(0);
        const blockRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            blockRef.current &&
                setInputWidth(blockRef.current.clientWidth);
        }, [])
        return (
            <InputWrapperBlock width={width}>
                <div className="header">
                {label?<Label text={label} require={required}/>:<p> </p>}
                {(errorMessages.length&& showError)?
                    <Helper
                        trigger={
                            <Trigger>
                                <p>Validation Error</p>
                                <MdHelp/>
                            </Trigger>
                        }
                        messages={errorMessages}
                    />:null
                }
                </div>

                <div ref={blockRef}>
                    {children}
                </div>

                {messages &&
                <MessagesWrapper inputWidth={inputWidth} title={String(messages)}>
                    {messages.map((item, index) => 
                        item && <p className="msg" key={index+item}>{item}</p>
                    )}
                </MessagesWrapper>
            }
                
            </InputWrapperBlock>
        )
    }
);
const InputWrapperBlock = styled.div<{width: number|undefined}>`
    ${utils.initiateCss};
    width: ${props => props.width ? rem(props.width) : '100%' };

    >:first-child {
        margin-bottom: ${rem(5)};
        ${flex.row};
        ${flex.jc.spaceB};
    }
`;
const MessagesWrapper = styled.div<{inputWidth:number}>`
    ${props => props.inputWidth && utils.singleEllipsis(props.inputWidth)};
    >p {
        color: ${palette.gray800};
        margin-right: ${rem(10)};
    }
`

export default InputWrapper;