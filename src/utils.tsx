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
    grayLighten40:  '#FAFAFA' as const, 
    /** GRAY 200: lignten 30% */
    grayLighten30:  '#EEEEEE' as const,
    /** GRAY 300: lignten 20%, LIGHT, DIVIDER */
    grayLighten20:  '#DDDDDD' as const,
    /** GRAY 400: lignten 10% PRIMARY, DISABLED */
    grayLighten10:  '#BDBDBD' as const,
    /** GRAY 500: normal */
    gray:           '#9E9E9E' as const,
    /** GRAY 600: darken 10% */
    grayDarken10:   '#757575' as const,
    /** GRAY 700: darken 20% */
    grayDarken20:   '#555555' as const,
    /** GRAY 800: darken 30%, PRIMARY_BLACK */
    grayDarken30:   '#3D3D3D' as const, 
    /** GRAY 900: darken 40% */
    grayDarken40:   '#1F1F1F' as const,

    /** BLUE 100: lighten40 */
    blueLighten40:  '#c8e7ff' as const,
    /** BLUE 200: lighten30 */
    blueLighten30:  '#95d1ff' as const,
    /** BLUE 300: lighten20 */
    blueLighten20:  '#62bbff' as const,
    /** BLUE 400: lighten10 */
    blueLighten10:  '#2fa5ff' as const,
    /** BLUE 500: normal, PRIMARY */
    blue:           '#008EFB' as const,
    /** BLUE 600: darken10 */
    blueDarken10:   '#0071c8' as const,
    /** BLUE 700: darken20 */
    blueDarken20:   '#005495' as const,
    /** BLUE 800: darken30 */
    blueDarken30:   '#003762' as const,
    /** BLUE 900: darken40 */
    blueDarken40:   '#001b2f' as const,

    /** RED 100: lighten40 */
    redLighten40:   '#fff1ee' as const,
    /** RED 200: lighten30 */
    redLighten30:   '#ffc7bb' as const,
    /** RED 300: lighten20 */
    redLighten20:   '#ff9e88' as const,
    /** RED 400: lighten10 */
    redLighten10:   '#ff7455' as const,
    /** RED 500: normal, PRIMARY, ERROR */
    red:            '#FF4A22' as const,
    /** RED 600: darken10 */
    redDarken10:    '#ee2b00' as const,
    /** RED 700: darken20 */
    redDarken20:    '#bb2200' as const,
    /** RED 800: darken30 */
    redDarken30:    '#881900' as const,
    /** RED 900: darken40 */
    redDarken40:    '#550f00' as const,
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
        background: ${palette.grayLighten40};
        color: white;
        cursor: default;
    `,
    sticky: css`
        position: sticky;
        top: ${rem(100)};
        height: fit-content;
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
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
`;

export const flex = {
    row: css`
        ${dFlex};
        flex-direction: row;
        -ms-flex-direction: row;
    `,
    rowR: css`
        ${dFlex};
        flex-direction: row-reverse;
    -ms-flex-direction: row-reverse;
    `,
    col: css`
        ${dFlex};
        flex-direction: column;
        -ms-flex-direction: column;
    `,
    colR: css`
        ${dFlex};
        flex-direction: column-reverse;
        -ms-flex-direction: column-reverse;
    `,
    wrap: css`
        -ms-flex-wrap : wrap;
        flex-wrap: wrap;
    `,
    nowrap: css`
        -ms-flex-wrap : nowrap;
        flex-wrap: nowrap;
    `,
    jc: {
        center: css`
            justify-content: center;
            -ms-flex-pack: center;
        `,
        start: css`
            justify-content: flex-start;
            -ms-flex-pack: start;
        `,
        end: css`
            justify-content: flex-end;
            -ms-flex-pack: end;
        `,
        spaceA: css`
            justify-content: space-around;
            -ms-flex-pack: justify; //no space-around
        `,
        spaceB: css`
            justify-content: space-between;
            -ms-flex-pack: justify;
        `,
        unset: css`
            justify-content: unset;
            -ms-flex-pack: unset;
        `,
    },
    ai: {
        center: css`
            align-items: center;
            -ms-flex-align: center;
        `,
        start: css`
            align-items: flex-start;
            -ms-flex-align: start;
        `,
        end: css`
            align-items: flex-end;
            -ms-flex-pack: end;
        `,
        unset: css`
            align-items: unset;
            -ms-flex-pack: unset;
        `,
    },
    flex: (value: string) => {
        return css`
            -webkit-flex: ${value}; /* Safari 6.1+ */ 
            -ms-flex: ${value}; /* IE 10 */ 
            flex: ${value};
        `;
    }
};
