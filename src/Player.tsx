import React, { MouseEvent } from 'react'
import Provider from './Context'
import styled, { css } from 'styled-components'
import GlobalStyles from './GlobalStyles'
import Spinner from './Spinner'
import FullScreen from './ToolbarFullScreen'
import BigPlayButton from './BigPlayButton'
import Timer from './ToolbarTimer'
import Volume from './ToolbarVolume'
import PlayButton from './ToolbarPlayButton'
import ToolbarWrapper from './Toolbar'
import { debounce, throttle } from './utils'

interface IPLayerWrapper {
    isFullScreen: boolean
}

const PLayerWrapper = styled(GlobalStyles)<IPLayerWrapper>`
    width: 600px;
    height: 337.5px;
    position: relative;
    margin: 0;
    padding: 0;
    font-weight: normal;
    line-height: 1.4;
    overscroll-behavior: none;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    background-color: transparent;
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
`

const Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

/**
 * Url: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
 * Video: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */

function Player(): JSX.Element {
    const [isPlay, updatePlay] = React.useState<boolean>(false)
    const [isPlaying, updatePlaying] = React.useState<boolean>(false)
    const [isEnded, updateEnded] = React.useState<boolean>(false)
    const [isWaiting, updateWaiting] = React.useState<boolean>(false)
    const [isFullScreen, updateFullScreen] = React.useState<boolean>(false)
    const [volume, updateVolume] = React.useState<number>(0)
    const [duration, updateDuration] = React.useState<number>(0)
    const [currentTime, updateCurrentTime] = React.useState<number>(0)
    const videoRef = React.useRef<HTMLVideoElement>(null!)
    const [showToolbar, setShowToolbar] = React.useState<boolean>(false)

    function onTogglePlayPauseClick(evt: MouseEvent<HTMLButtonElement>) {
        videoRef.current.play()
    }

    const hideToolbar = React.useCallback(
        debounce(function () {
            setShowToolbar(false)
        }, 3000),
        [],
    )

    const onMouseMove = React.useCallback(
        throttle(function () {
            console.log('onMouseMove')
            setShowToolbar(true)
            hideToolbar()
        }),
        [],
    )

    function onMouseLeave() {
        console.log('onMouseLeave')
        setShowToolbar(false)
    }

    function onPlayerClick(evt: MouseEvent<HTMLDivElement>) {
        const $target = evt.target as HTMLElement
        const tagName = $target.tagName.toLowerCase()
        if (tagName === 'video') {
            videoRef.current.pause()
        }
    }

    function onWaiting() {
        updateWaiting(true)
    }

    function onPlaying() {
        updateWaiting(false)
        updatePlaying(true)
    }

    function onPlay() {
        updatePlay(true)
    }

    function onEnd() {
        updatePlay(false)
        updateEnded(false)
        updateFullScreen(false)
    }

    function onPause() {
        updatePlaying(false)
    }

    function onTimeUpdate() {
        const currentTime = Math.round(videoRef.current.currentTime || 0)
        updateCurrentTime(currentTime)
    }

    function onVolumeChange() {
        const volume = videoRef.current.volume || 0
        console.log(videoRef.current.volume)
    }

    function onDurationChange() {
        updateDuration(videoRef.current.duration)
    }

    return (
        <Provider>
            <PLayerWrapper
                isFullScreen={isFullScreen}
                onClick={onPlayerClick}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            >
                <Video
                    ref={videoRef}
                    onWaiting={onWaiting}
                    onPlaying={onPlaying}
                    onPlay={onPlay}
                    onEnded={onEnd}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onVolumeChange={onVolumeChange}
                    onDurationChange={onDurationChange}
                >
                    <source
                        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                        type="video/webm"
                    />
                </Video>

                {(!isPlay || !isPlaying) && <BigPlayButton onClick={onTogglePlayPauseClick} />}
                <Spinner isWaiting={isWaiting} />
                <ToolbarWrapper
                    showToolbar={showToolbar}
                    left={
                        <React.Fragment>
                            <PlayButton isPlaying={isPlaying} />
                            <Timer duration={duration} currentTime={currentTime} />
                            <Volume />
                        </React.Fragment>
                    }
                    right={<FullScreen isFullScreen={isFullScreen} updateFullScreen={updateFullScreen} />}
                />
            </PLayerWrapper>
        </Provider>
    )
}

export default Player
