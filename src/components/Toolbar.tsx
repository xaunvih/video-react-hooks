import React from 'react'
import styled, { css } from 'styled-components'
import { useVideoContext } from '../context/Context'
import { standartSpacingPoint } from '../styles'

const S = {} as any

S.ToolbarSpace = styled.div`
    flex-grow: 1;
`

S.ToolbarCommon = styled.div`
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

S.Toolbar = styled(S.ToolbarCommon)<{ isShow: boolean }>`
    ${(props) =>
        props.isShow &&
        css`
            opacity: 1;
        `}
`

function ToolbarWrapper({ children }): React.ReactElement {
    const { state } = useVideoContext()
    const { showToolbar } = state
    return <S.Toolbar isShow={showToolbar}>{children}</S.Toolbar>
}

export { S, ToolbarWrapper as default }
