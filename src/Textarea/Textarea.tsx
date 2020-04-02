import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import InputWrapper from '../InputWrapper/InputWrapper';

const TextareaBlock = styled.div<{ height: string }>`
    width: 100%;
    >textarea {
        width: 100%;
        height: ${props => props.height};
        margin: 0;
        padding-right: ${rem(13)};
        border: 1px solid ${palette.gray400};
        border-radius: 2px;
        background: ${palette.gray100};
        color: ${palette.gray800};
    }

    >textarea::placeholder {
        color: ${palette.gray500};
        font-size: ${rem(14)};
        letter-spacing: 0;
    }

    >textarea:disabled {
        background: ${palette.gray300};
    }
    >textarea:disabled::placeholder {
        color: ${palette.gray400};
    }
`;

interface OwnProps {
    label?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler;
    checkError?: React.ChangeEventHandler;
    required?: boolean;
    messages?: string[];
    errorMessages?: string[];
    height?: string;
    placeholder?: string;
    disabled?: boolean;
    /** Basic property: style */
    style?: React.CSSProperties;
    /** Basic property: className */
    className?: string;
}
type Props = OwnProps;

const Textarea = ({
    label, required, name, value,
    onChange, checkError, messages, errorMessages,
    placeholder, disabled, height = '6.25rem',
    style, className
}: Props) => {
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
            label={label}
            required={required}
            errorMessages={errorMessages}
            messages={messages}
            showError={showError}
            className={className}
            style={style}
        >
            <TextareaBlock height={height}>
                <textarea name={name} value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </TextareaBlock>
        </InputWrapper>
    )
}

export default Textarea;