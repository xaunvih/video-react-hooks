import React from 'react'
import styled, { css } from 'styled-components'
import { useVideoContext } from './Context'
import { standartSpacingPoint } from './styles'

interface IToolbarWrapper {
    children: React.ReactNode
}

const ToolbarSpace = styled.div`
    flex-grow: 1;
`

const ToolbarCommon = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${standartSpacingPoint * 10}px;
    padding: ${standartSpacingPoint * 2}px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75));
    opacity: 0;
    transition: opacity 0.3s;
`

const Toolbar = styled(ToolbarCommon)<{
    isShow: boolean
}>`
    ${(props) =>
        props.isShow &&
        css`
            opacity: 1;
        `}
`

function ToolbarWrapper(props: IToolbarWrapper): JSX.Element {
    const { state } = useVideoContext()
    const { showToolbar } = state
    return <Toolbar isShow={showToolbar}>{props.children}</Toolbar>
}

export { ToolbarSpace, ToolbarWrapper as default }
