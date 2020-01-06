import React from 'react';
import { MdDone } from "react-icons/md";
import styled, { css } from 'styled-components';
import cx from 'classnames';
import { flex, palette, rem } from '../utils';

interface CheckBoxProps {
    checked: boolean;
    onClick?: any;
    label?: string;
    style?: any;
    disabled?: boolean;
    circle?: boolean;
}
const CheckBox = ({
    checked,
    onClick,
    label,
    style,
    disabled=false,
    circle
}:CheckBoxProps) => {
    return (
        <CheckBoxBlock disabled={disabled} onClick={onClick} style={{...style}}>
            <div className={cx("check-box", {"check-box-checked":checked}, {circle})}>
                {checked&&<MdDone/>}
            </div>
            <div className={cx("label", {"label-checked":checked})} >
                {label&&<h5>{label}</h5>}
            </div>
        </CheckBoxBlock>
    )
}

const disabled = css`
    pointer-events: none;

    .label h5 {
        color: ${palette.grayLighten10};
    }

    .check-box {
        border: 1px solid ${palette.grayLighten10};
        background: ${palette.grayLighten20};
    }

    .check-box-checked {
        background-color: ${palette.gray};
        border-color: ${palette.gray};
    }

    .label-checked {
        >h5 {
            color: ${palette.gray};
        }
    }
`;

const CheckBoxBlock = styled.div<{disabled:boolean}>`
    ${flex.row};
    ${flex.ai.center};
    cursor: pointer;
    width: fit-content;
    &:hover {
        .check-box {
            background-color: ${palette.blue};
        }

        .label >h5 {
            font-size: 13px;
            color: ${palette.blue};
        }
    }
    &:active {
        .check-box {
            background-color: ${palette.blueDarken10};
        }

        .label >h5 {
            font-size: 13px;
            color: ${palette.blueDarken10};
        }
    }
    .check-box {
        width: ${rem(17)};
        height: ${rem(17)};
        border: 1px solid ${palette.grayLighten10};
        border-radius: 2px;
        cursor: pointer;
        margin-right: ${rem(10)};
        ${flex.flex('none')};
    }

    .check-box.circle {
        border-radius: 100px;
    }
    
    .check-box-checked {
        background-color: ${palette.blue};
        border: 1px solid ${palette.blue};
        ${flex.row};
        ${flex.ai.center};
        ${flex.jc.center};
        >svg {
            color: white;
            font-size: ${rem(12)};
        }
    }
    .label {
        >h5 {
            font-size: 13px;
        }
    }

    .label-checked {
        p {
            color: ${palette.blue};
        }
    }

    ${props => props.disabled && disabled};
`;

export default CheckBox;