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
import ToolbarWrapper, { Toolbar } from './Toolbar'

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

    &:hover {
        ${Toolbar} {
            opacity: 1;
        }
    }

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
    const [duration, updateDuration] = React.useState<number>(0)
    const [currentTime, updateCurrentTime] = React.useState<number>(0)
    const videoRef = React.useRef<HTMLVideoElement>(null!)

    function onTogglePlayPauseClick(evt: MouseEvent<HTMLButtonElement>) {
        videoRef.current.play()
    }

    function onMouseEnter() {
        console.log('onMouseEnter')
    }

    function onMouseLeave() {
        console.log('onMouseLeave')
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
                onMouseEnter={onMouseEnter}
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
                    poster="https://znews-photo.zadn.vn/w660/Uploaded/wyhktpu/2021_04_20/Tieu_Nu_Nghe_Thuong.jpg"
                >
                    <source
                        src="https://znews-mcloud-bf-s2-te-vnso-pt-3.zadn.vn/nq0wDJSnU8A/6b16e1350df3e6adbfe2/f8fb48fc1034fb6aa225/480/5f0ee9c0618b88d5d19a.mp4?authen=exp=1619160368~acl=/nq0wDJSnU8A/*~hmac=b6d08feb5056f46ea1121c8d206fe015"
                        type="video/mp4"
                    />
                </Video>

                {(!isPlay || !isPlaying) && <BigPlayButton onClick={onTogglePlayPauseClick} />}
                <Spinner isWaiting={isWaiting} />
                <ToolbarWrapper
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
