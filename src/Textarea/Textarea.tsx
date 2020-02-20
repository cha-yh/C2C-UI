import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import InputWrapper from '../InputWrapper/InputWrapper';

const TextareaBlock = styled.div`
    width: 100%;
    >textarea {
        width: 100%;
        height: ${rem(100)};
        margin: 0;
        padding-right: ${rem(13)};
        border: 1px solid ${palette.gray400};
        border-radius: 2px;
        background: ${palette.gray100};
        color: ${palette.gray800};
    }
`;

interface OwnProps {
    label?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler;
    checkError?: React.ChangeEventHandler;
    required?: boolean;
    message?: string[];
    errorMessages?: string[];
}
type Props = OwnProps;

const Textarea: React.SFC<Props> = ({label, required, name, value, onChange, checkError, message, errorMessages}) => {
    const [focus, setFocus] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);
    const [showError, setShowError] = useState(false);

    const onFocus = useCallback(() => {
        setFocus(true);
    }, []);
    const handleBlur = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFocus(false);
        setShowError(true);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(e);
        if (checkError) checkError(e);
        
    }, []);

    return (
        <InputWrapper
            label= {label}
            required= {required}
            errorMessages= {errorMessages}
            messages= {message}
            showError= {showError}
        >
            <TextareaBlock>
                <textarea name={name} value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    required={required}
                />
            </TextareaBlock>
        </InputWrapper>
    )
}

export default Textarea;