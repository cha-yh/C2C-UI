import React, { useCallback, useState, forwardRef, useRef, useEffect, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import Label from '../Label/Label';
import { MdHelp } from 'react-icons/md';

export const getInputStatus = (focus: boolean, showError: boolean, disabled?: boolean, errorMessages?: any[], ) => {
    if (focus) {
        return 'focus';
    }
    if (disabled) {
        return 'disabled';
    }
    if (errorMessages?.length && showError && errorMessages[0]) {
        return 'error';
    } else {
        return null;
    }
}
type HelperProps = {
    trigger: ReactNode,
    messages: string[]
}
const Helper = ({ trigger, messages }: HelperProps) => {
    return (
        <HelperBlock>
            {trigger}
            <Popup>
                <p>Check below validation messages</p>
                <ul>
                    {messages.map((item, index) =>
                        item && <li key={item + index}>{item}</li>
                    )}
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
        margin-top: ${rem(3)};
        margin-left: ${rem(4)};
    }
`;

type InputWrapperProps = {
    children?: React.ReactNode,
    label?: string,
    required?: boolean,
    messages?: string[],
    showError?: boolean,
    errorMessages?: string[],
    width?: string;
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
}
export const InputWrapper = forwardRef<HTMLInputElement, InputWrapperProps>(
    (
        {
            children,
            label,
            required,
            messages,
            showError,
            errorMessages = [],
            width, style, className
        },
        ref
    ) => {
        const [inputWidth, setInputWidth] = useState(0);
        const blockRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            blockRef.current &&
                setInputWidth(blockRef.current.clientWidth);
        }, [])
        return (
            <InputWrapperBlock width={width} style={style} className={className}>
                <div className="header">
                    {label ? <Label text={label} required={required} /> : <p> </p>}
                    {(errorMessages.length && showError && errorMessages[0]) ?
                        <Helper
                            trigger={
                                <Trigger>
                                    <p>Error Messages</p>
                                    <MdHelp />
                                </Trigger>
                            }
                            messages={errorMessages}
                        /> : null
                    }
                </div>

                <div ref={blockRef}>
                    {children}
                </div>

                {messages &&
                    <MessagesWrapper inputWidth={inputWidth} title={String(messages)}>
                        {messages.map((item, index) =>
                            item && <p className="msg" key={index + item}>{item}</p>
                        )}
                    </MessagesWrapper>
                }

            </InputWrapperBlock>
        )
    }
);
const InputWrapperBlock = styled.div<{ width: string | undefined }>`
    ${utils.initiateCss};
    width: ${props => props.width ? props.width : '100%'};

    >:first-child {
        margin-bottom: ${rem(5)};
        ${flex.row};
        ${flex.jc.spaceB};
    }
`;
const MessagesWrapper = styled.div<{ inputWidth: number }>`
    ${props => props.inputWidth && utils.singleEllipsis(props.inputWidth)};
    >p {
        color: ${palette.gray700};
        margin-right: ${rem(10)};
    }
`

export default InputWrapper;