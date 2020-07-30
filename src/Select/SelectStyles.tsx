import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

const selectStyles = {
    focus: css`
        .select-body {
            border-color: ${palette.blue500};
            
        }
        
    `,
    disabled: css`
        .select-body {
            border-color: ${palette.gray500};
            background: ${palette.gray200};

            .placeholder.selected {
                color: ${palette.gray500};
            }

            >input:disabled {
                background: ${palette.gray200};
            }
        }
        cursor: not-allowed;
    `,
    error: css`
        .select-body {
            border-color: ${palette.red500};
        }

        .error {
            color: ${palette.red500};
        }
    `
}

const selectBody = css`
    border: 1px solid ${palette.gray400};
    padding: ${rem(5)} ${rem(13)};
    ${flex.row};
    ${flex.jc.spaceB};
    ${flex.ai.center};
    background: white;
    cursor: pointer;
    >input {
        width: 100px;
        opacity: 0;
        z-index: -1;
        position: absolute;
    }
    >.placeholder {
        color: ${palette.gray500};
        font-size: ${rem(14)};
        letter-spacing: -1px;
    }

    >.placeholder.selected {
        color: black;
    }

    >.selected-box {
        ${flex.row};
        ${flex.jc.start};
        ${flex.wrap};
        width: 100%;
    }

`;
export const SelectBlock = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null, height: string|undefined, isUpper: boolean }>`
    ${utils.initiateCss};
    position: relative;
    width: 100%;
    >.select-body {
        ${selectBody};
        min-height: ${props => props.height ?props.height :rem(40)};
    }
    ${props => props.inputStatus && selectStyles[props.inputStatus]};

    ${props => (props.inputStatus === 'focus' && props.isUpper) && css`
        .select-body {
            border-bottom: none;
        }
    `};
    ${props => (props.inputStatus === 'focus' && !props.isUpper) && css`
        .select-body {
            border-top: none;
        }
    `};
`;

export const SelectedItemBlock = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null }>`
    height: ${rem(23)};
    margin: ${rem(2)} ${rem(5)} ${rem(2)} 0;
    padding: ${rem(5)} ${rem(10)};
    background: ${palette.blue500};
    ${flex.row};
    ${flex.ai.center};
    border-radius: ${rem(100)};
    

    >h5 {
        color: white;
        margin-bottom: ${rem(2)};
    }

    >svg {
        color: white;
    }

    >:first-child {
        margin-right: ${rem(5)};
    }

    ${props => props.inputStatus === 'disabled' && css`
        background: ${palette.gray400};
        color: ${palette.red200};
    `}
`;

export const ListItemBlock = styled.div<{multiple:boolean}>`
    cursor: pointer;
    ${flex.row};
    padding: ${rem(5)} 0;
    width: calc(100% - 1rem);
    &:hover {
        background: ${palette.gray200}; 
    }
    >.item {
        width: 100%;
        font-weight: 700;
        margin: 0;
        cursor: pointer;
        margin-left: ${props => props.multiple && rem(10)};
    }

    >.item.select {
        color: ${palette.blue500};
    }
`;