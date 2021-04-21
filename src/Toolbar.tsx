import React from 'react'
import styled from 'styled-components'

const Toolbar = styled.div`
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
`

interface IToolbarWrapper {
    left: React.ReactNode
    right: React.ReactNode
}

function ToolbarWrapper({ left, right }: IToolbarWrapper): JSX.Element {
    return (
        <Toolbar>
            <div>{left}</div>
            <div>{right}</div>
        </Toolbar>
    )
}

export default ToolbarWrapper
export { Toolbar }
