import { css } from 'styled-components';
/**
 * MEDIA
 */
export const media = {
    size: {
        small: '23.5rem', //376px
        medium: '48rem', //768px
        large: '64rem', //1024px
    },
    SMALL: `(max-width: 23.5rem)`,
    MEDIUM: `(max-width: 48rem)`,
    LARGE: `(max-width: 64rem)`,
}

/**
 * PALETTE
 */
export const palette = {
    grayGreen:          '#93ad93' as const, //gray-green, sampleTradeItemHead
    grayGreenDarken10:  '#6b826b' as const, //hover

    /** GRAY 100: lighten 40%, PRIMARY_WHITE */
    gray100:  '#FAFAFA' as const, 
    /** GRAY 200: lignten 30% */
    gray200:  '#EEEEEE' as const,
    /** GRAY 300: lignten 20%, LIGHT, DIVIDER */
    gray300:  '#DDDDDD' as const,
    /** GRAY 400: lignten 10% PRIMARY, DISABLED */
    gray400:  '#BDBDBD' as const,
    /** GRAY 500: normal */
    gray500:  '#9E9E9E' as const,
    /** GRAY 600: darken 10% */
    gray600:   '#757575' as const,
    /** GRAY 700: darken 20% */
    gray700:   '#555555' as const,
    /** GRAY 800: darken 30%, PRIMARY_BLACK */
    gray800:   '#3D3D3D' as const, 
    /** GRAY 900: darken 40% */
    gray900:   '#1F1F1F' as const,

    /** BLUE 100: lighten40 */
    blue100:  '#c8e7ff' as const,
    /** BLUE 200: lighten30 */
    blue200:  '#95d1ff' as const,
    /** BLUE 300: lighten20 */
    blue300:  '#62bbff' as const,
    /** BLUE 400: lighten10 */
    blue400:  '#2fa5ff' as const,
    /** BLUE 500: normal, PRIMARY */
    blue500:  '#008EFB' as const,
    /** BLUE 600: darken10 */
    blue600:   '#0071c8' as const,
    /** BLUE 700: darken20 */
    blue700:   '#005495' as const,
    /** BLUE 800: darken30 */
    blue800:   '#003762' as const,
    /** BLUE 900: darken40 */
    blue900:   '#001b2f' as const,

    /** RED 100: lighten40 */
    red100:   '#fff1ee' as const,
    /** RED 200: lighten30 */
    red200:   '#ffc7bb' as const,
    /** RED 300: lighten20 */
    red300:   '#ff9e88' as const,
    /** RED 400: lighten10 */
    red400:   '#ff7455' as const,
    /** RED 500: normal, PRIMARY, ERROR */
    red500:   '#FF4A22' as const,
    /** RED 600: darken10 */
    red600:    '#ee2b00' as const,
    /** RED 700: darken20 */
    red700:    '#bb2200' as const,
    /** RED 800: darken30 */
    red800:    '#881900' as const,
    /** RED 900: darken40 */
    red900:    '#550f00' as const,
}

/**
 * REM
 */
export const rem = (px: number) => {
    return `${(px / 16)}rem`;
}

/**
 * UTILS
 */
export const utils = {
    shadow: css`
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.12);
    `,
    shadowCircle: css`
        box-shadow: 0 1px 3px 0 rgba(0,0,0,1.52);
    `,
    containerBox: css`
        width: 90%;
        max-width: ${rem(1200)};
        margin: ${rem(20)} auto;
    `,
    disabled: css`
        background: ${palette.gray100};
        color: white;
        cursor: default;
    `,
    sticky: css`
        position: sticky;
        top: ${rem(100)};
        margin-left: ${rem(20)};
    `,
    ellipsis: (lineCount: number) => css`
        display: -webkit-box;
        word-wrap:break-word;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${lineCount}; /* 라인수 */
    `,
    singleEllipsis: (width: number) => css`
        width: ${rem(width)};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    headerText: css`
        font-size: ${rem(32)};
        margin: ${rem(80)} 0;
    `,

    initiateCss: css`
        * { box-sizing: border-box; }
        h1, h2, h3, h4, h5, p, a, li { margin: 0; }
        
        p, a {
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        li { font-size: 0.875rem; }
        
        h1 { font-size: 2rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; }
        h4 { font-size: 1rem; }
        h5 { font-size: 0.875rem; }
        code { font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace; }
    `
}

/**
 * FLEX
 */
const dFlex = css`
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
`;

export const flex = {
    row: css`
        ${dFlex};
        flex-direction: row;
    `,
    rowR: css`
        ${dFlex};
        flex-direction: row-reverse;
    `,
    col: css`
        ${dFlex};
        flex-direction: column;
    `,
    colR: css`
        ${dFlex};
        flex-direction: column-reverse;
    `,
    wrap: css`
        flex-wrap: wrap;
    `,
    nowrap: css`
        flex-wrap: nowrap;
    `,
    jc: {
        center: css`
            justify-content: center;
        `,
        start: css`
            justify-content: flex-start;
        `,
        end: css`
            justify-content: flex-end;
        `,
        spaceA: css`
            justify-content: space-around;
        `,
        spaceB: css`
            justify-content: space-between;
        `,
        unset: css`
            justify-content: unset;
        `,
    },
    ai: {
        center: css`
            align-items: center;
        `,
        start: css`
            align-items: flex-start;
        `,
        end: css`
            align-items: flex-end;
        `,
        unset: css`
            align-items: unset;
        `,
    },
    flex: (value: string) => {
        return css`
            -webkit-flex: ${value}; /* Safari 6.1+ */ 
            flex: ${value};
        `;
    }
};
