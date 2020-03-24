import styled, { css } from 'styled-components';
import { rem, utils, flex, palette } from '../utils';

const selectStyles = {
    focus: css`
        .select-body {
            border-color: ${palette.blue500};
            border-bottom: none;
        }
        .select-list {
            border-color: ${palette.blue500};
            border-top: none;
            display: block;
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
    min-height: ${rem(45)};
    border: 1px solid ${palette.gray400};
    padding: 0 ${rem(13)};
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

const selectList = css`
    z-index: 1;
    width: 100%;
    border: 1px solid ${palette.gray400};
    padding: ${rem(10)};
    padding-top: 0;
    background: white;
    ${utils.shadow};
    position: absolute;
    display: none;

    .input-wrapper {
        ${flex.row};
        ${flex.jc.spaceB};
        ${flex.ai.center};
        border: 1px solid ${palette.gray300};
        padding-right: ${rem(10)};
        >input {
            width: 100%;
            border-radius: 2px;
            margin-right: ${rem(10)};
            border: none;
            outline: none;
            padding: ${rem(10)};
        }
        >p {

        }
    }

    .list-wrapper {
        padding-top: ${rem(10)};

        /** Scrollbar */
        >div {
            >div:first-child {
                max-height: 12.5rem !important;
                /* min-height: 7rem !important; */
                min-height: 100% !important;
                position: unset !important;
                /* overflow-x: auto !important; */
                /* height: 100% !important; */
            }
        }

    }
    
`;
export const SelectBlock = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null }>`
    ${utils.initiateCss};
    position: relative;
    width: 100%;
    >.select-body {
        ${selectBody};
    }

    >.select-list {
        ${selectList};
    }
    ${props => props.inputStatus && selectStyles[props.inputStatus]};
`;

export const SelectedItemBlock = styled.div<{ inputStatus: 'focus' | 'disabled' | 'error' | null }>`
    height: ${rem(23)};
    margin: ${rem(2)};
    padding: ${rem(5)} ${rem(10)};
    background: ${palette.blue500};
    ${flex.row};
    ${flex.ai.center};
    border-radius: ${rem(100)};
    

    >h5 {
        color: white;
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
    padding: ${rem(5)} ${rem(10)};
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
`;