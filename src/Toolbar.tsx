import React from 'react'
import styled, { css } from 'styled-components'

interface IToolbarWrapper {
    children: React.ReactNode
    showToolbar: boolean
}

interface IToolbarStyles {
    isShow: boolean
}

const Toolbar = styled.div<IToolbarStyles>`
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

function ToolbarWrapper({ children, showToolbar }: IToolbarWrapper): JSX.Element {
    React.useEffect(() => {
        console.log('[ToolbarWrapper] --> re-render')
    })

    return <Toolbar isShow={showToolbar}>{children}</Toolbar>
}

export default ToolbarWrapper
