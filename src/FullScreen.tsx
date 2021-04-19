import React from 'react'
import styled from 'styled-components'
import fullscreenAPI from './FullScreeenAPI'

console.log(fullscreenAPI)

interface IProps {
    isFullScreen: boolean
}

const Icon = styled.span`
    color: #fff;
`

function FullScreen({ isFullScreen }: IProps): JSX.Element {
    return (
        <button>
            <Icon className="material-icons">${isFullScreen ? 'fullscreen_exit' : 'fullscreen'} </Icon>
        </button>
    )
}

FullScreen.defaultProps = {
    isFullScreen: false,
}

export default FullScreen
