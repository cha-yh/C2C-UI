import React, { useCallback, useState, forwardRef, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import Label from '../Label/Label';
type InputWrapperProps = {
    children?: React.ReactNode,
    label?: string,
    required?: boolean,
    error?: boolean,
    messages?: string[],
}
const InputWrapper = forwardRef(
    ({
        children,
        label,
        required,
        error=false,
        messages
    }:InputWrapperProps,
    ref?: React.Ref<HTMLInputElement>) => {
        const [inputWidth, setInputWidth] = useState(0);
        const blockRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            blockRef.current &&
                setInputWidth(blockRef.current.clientWidth);
        }, [])
        return (
            <div>
                {label&&<Label text={label} require={required}/>}
                <div ref={blockRef}>
                    {children}
                </div>
                {messages &&
                <MessagesWrapper error={error} inputWidth={inputWidth} title={String(messages)}>
                    {messages.map((item, index) => 
                        item && <span className="msg" key={index+item}>"{item}"</span>
                    )}
                </MessagesWrapper>
            }
                
            </div>
        )
    }
);
const MessagesWrapper = styled.div<{error: boolean, inputWidth:number}>`
    position: absolute;
        ${props => props.inputWidth && utils.singleEllipsis(props.inputWidth)};
        >span {
            color: ${palette.grayDarken30};
            color: ${props => props.error &&
                palette.red
            };
            margin-right: ${rem(10)};
        }
`

export default InputWrapper;