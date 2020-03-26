import styled from "styled-components";
import { rem, palette } from "./utils";

export const Box = styled.div`
    >h5 {
        margin: ${rem(20)} 0;
        margin-top: ${rem(40)}; 
        color: ${palette.blue700};
        font-size: ${rem(24)};
        border-left: ${rem(5)} solid ${palette.blue500};
        padding-left: ${rem(10)};
    }
`;