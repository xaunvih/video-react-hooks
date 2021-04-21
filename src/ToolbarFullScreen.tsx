import React from 'react'
import styled from 'styled-components'
import FullscreenAPI from './ToolbarFullScreeenAPI'

interface IProps {
    isFullScreen: boolean
    updateFullScreen: (isFullScreen: boolean) => void
}

const Icon = styled.span`
    color: #fff;
`

function FullScreen({ isFullScreen, updateFullScreen }: IProps): JSX.Element {
    React.useEffect(() => {
        function onFullScreenChange() {
            updateFullScreen(FullscreenAPI.isFullscreen)
        }

        FullscreenAPI.addEventListener(onFullScreenChange)
        return () => {
            FullscreenAPI.removeEventListener(onFullScreenChange)
        }
    }, [updateFullScreen])

    React.useEffect(() => {
        console.log('FullScreen -- render')
        return () => {
            console.log('FullScreen -- un mount')
        }
    }, [updateFullScreen])

    function onClick() {
        if (!isFullScreen) {
            FullscreenAPI.request()
        } else {
            FullscreenAPI.exit()
        }

        updateFullScreen(!isFullScreen)
    }

    return (
        <button onClick={onClick}>
            <Icon className="material-icons">${isFullScreen ? 'fullscreen_exit' : 'fullscreen'} </Icon>
        </button>
    )
}

FullScreen.defaultProps = {
    isFullScreen: false,
    updateFullScreen: () => {},
}

export default FullScreen
