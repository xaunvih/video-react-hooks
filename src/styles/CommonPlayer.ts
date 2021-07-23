import styled from 'styled-components'
import { standartSpacingPoint, colors, fontSizes } from '.'

const CommonPlayer = styled.div`
    button,
    input,
    optgroup,
    select,
    textarea {
        font: inherit;
        font-family: inherit;
        font-size: 100%;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;

        &:focus {
            outline-offset: 0;
        }
    }

    button,
    select {
        text-transform: none;
        background-color: transparent;
    }

    button {
        -webkit-appearance: none;
        cursor: pointer;
        border-style: none;
    }

    textarea {
        overflow: auto;
        vertical-align: top;
    }

    main,
    header,
    footer,
    aside,
    article,
    section,
    details {
        display: block;
    }

    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;

        &:focus {
            outline: none;
        }

        &[hidden] {
            display: none;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    b,
    strong {
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    ul,
    ol,
    p {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    a {
        background-color: transparent;
        cursor: pointer;
    }

    width: ${standartSpacingPoint * 75}px;
    height: ${standartSpacingPoint * 42}px;
    position: relative;
    margin: 0;
    padding: 0;
    font-weight: normal;
    line-height: 1.4;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: ${fontSizes.large};
    font-family: sans-serif;
    background-color: ${colors.black};
`

export default CommonPlayer
