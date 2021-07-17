import React, { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import CommonPlayer from './styles/CommonPlayer'

interface PlayerStyles {
    isFullScreen: boolean
}

const PLayer = styled(CommonPlayer)<PlayerStyles>`
    width: 600px;
    height: 337.5px;
    position: relative;
    margin: 0;
    padding: 0;
    font-weight: normal;
    line-height: 1.4;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    font-family: sans-serif;
    background-color: #000;

    ${(props) =>
        props.isFullScreen &&
        css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `};

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

interface IPlayerWrapper {
    isPlaying: boolean
    showToolbar: boolean
    isEnded: boolean
    isPause: boolean
    isFullScreen: boolean
    setShowToolbar: (showToolbar: boolean) => void
    children: React.ReactNode
}

function Player(props: IPlayerWrapper): JSX.Element {
    const { isPlaying, isFullScreen, showToolbar, isEnded, isPause, setShowToolbar } = props
    const timeoutRef = useRef<number>(0)

    const toggleToolbar = useCallback(
        (showToolbar: boolean, timeout: number) => {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = window.setTimeout(() => {
                setShowToolbar(showToolbar)
            }, timeout)
        },
        [setShowToolbar],
    )

    function onMouseMove() {
        if (isPlaying && !showToolbar) {
            setShowToolbar(true)
            toggleToolbar(false, 4000)
        }
    }

    function onMouseOut() {
        if (isPlaying && showToolbar) {
            toggleToolbar(false, 0)
        }
    }

    useEffect(() => {
        if (isEnded || isPause) {
            toggleToolbar(true, 0)
        }
    }, [isEnded, isPause, toggleToolbar])

    useEffect(() => {
        if (isPlaying) {
            toggleToolbar(false, 4000)
        }
    }, [isPlaying, toggleToolbar])

    return (
        <PLayer isFullScreen={isFullScreen} onMouseMoveCapture={onMouseMove} onMouseLeave={onMouseOut}>
            {props.children}
        </PLayer>
    )
}

export default Player
