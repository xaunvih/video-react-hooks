import React from 'react'
import styled, { css } from 'styled-components'

interface IToolbarWrapper {
    left: React.ReactNode
    right: React.ReactNode
    showToolbar: boolean
}

interface IToolbar {
    isShow: boolean
}

const Toolbar = styled.div<IToolbar>`
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
        display: flex;
        align-items: center;
    }

    ${(props) =>
        props.isShow &&
        css`
            opacity: 1;
        `}
`

function ToolbarWrapper({ left, right, showToolbar }: IToolbarWrapper): JSX.Element {
    React.useEffect(() => {
        console.log('[ToolbarWrapper] --> re-render')
    })

    return (
        <Toolbar isShow={showToolbar}>
            <div>{left}</div>
            <div>{right}</div>
        </Toolbar>
    )
}

export default ToolbarWrapper
