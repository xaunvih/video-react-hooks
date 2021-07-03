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
    const [isPause, updatePause] = React.useState<boolean>(false)
    const [isWaiting, updateWaiting] = React.useState<boolean>(false)
    const [isFullScreen, updateFullScreen] = React.useState<boolean>(false)
    const [volume, updateVolume] = React.useState<number>(1)
    const [duration, updateDuration] = React.useState<number>(0)
    const [currentTime, updateCurrentTime] = React.useState<number>(0)
    const videoRef = React.useRef<HTMLVideoElement>(null!)
    const [showToolbar, setShowToolbar] = React.useState<boolean>(true)

    function onTogglePlayPauseClick(evt: MouseEvent<HTMLButtonElement>) {
        videoRef.current.play()
    }

    /**
     * Toolbar
     * 1. Pause --> show toolbar
     * 2.
     */
    const onMouseMove = React.useCallback(() => {
        const hideToolbar = debounce(function () {
            setShowToolbar(false)
        }, 5000)

        const handleMouseMove = throttle(function () {
            setShowToolbar(true)
            hideToolbar()
        })

        handleMouseMove()
    }, [])

    function onPlayerClick(evt: MouseEvent<HTMLDivElement>) {
        const $target = evt.target as HTMLElement
        const tagName = $target.tagName.toLowerCase()
        if (tagName === 'video') {
            videoRef.current.pause()
        }
    }

    function onWaiting() {
        console.log('onWaiting')
        updateWaiting(true)
    }

    function onPlaying() {
        console.log('onPlaying')
        updateWaiting(false)
        updatePlaying(true)
        updatePause(false)
    }

    function onPlay() {
        console.log('onPlay')
        updatePlay(true)
        updatePause(false)
    }

    function onEnd() {
        console.log('onEnd')
        updatePlay(false)
        updateEnded(false)
        updateFullScreen(false)
    }

    function onPause() {
        console.log('onPause')
        updatePlaying(false)
        updatePause(true)
    }

    function onTimeUpdate() {
        console.log('onTimeUpdate')
        const currentTime = Math.round(videoRef.current.currentTime || 0)
        updateCurrentTime(currentTime)
    }

    function onVolumeChange() {
        console.log('onVolumeChange')
        const volume = videoRef.current.volume || 0
        updateVolume(volume)
    }

    function onDurationChange() {
        console.log('onDurationChange')
        updateDuration(videoRef.current.duration)
    }

    React.useEffect(() => {
        videoRef.current.volume = volume
    }, [])

    console.log(
        <Provider>
            <PLayerWrapper isFullScreen={isFullScreen} onClick={onPlayerClick} onMouseMove={onMouseMove}>
                <Video
                    // controls
                    src="https://znews-mcloud-bf-s2-te-vnso-pt-4.zadn.vn/bGP61EP30DM/6ff10a041abff1e1a8ae/8b13e1024fa9a4f7fdb8/480/a5a026aea4fb4da514ea.mp4?authen=exp=1624613018~acl=/bGP61EP30DM/*~hmac=d3143453dd209ccfb94e4167b2794b27"
                    // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                    ref={videoRef}
                    onCanPlay={() => {
                        console.log('onCanPlay')
                    }}
                    onCanPlayThrough={() => {
                        console.log('onCanPlayThrough')
                    }}
                    onLoadedData={() => {
                        console.log('onLoadedData')
                    }}
                    onRateChange={() => {
                        console.log('onRateChange')
                    }}
                    onLoadedMetadata={() => {
                        console.log('onLoadedMetadata')
                    }}
                    onLoadStart={() => {
                        console.log('onLoadStart')
                    }}
                    onSuspend={() => {
                        console.log('onSuspend')
                    }}
                    onWaiting={onWaiting}
                    onPlaying={onPlaying}
                    onPlay={onPlay}
                    onEnded={onEnd}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onVolumeChange={onVolumeChange}
                    onDurationChange={onDurationChange}
                />

                {(!isPlay || !isPlaying) && <BigPlayButton onClick={onTogglePlayPauseClick} />}

                <Spinner isWaiting={isWaiting} />

                <ToolbarWrapper
                    showToolbar={showToolbar}
                    left={
                        <React.Fragment>
                            <PlayButton isPlaying={isPlaying} />
                            <Timer duration={duration} currentTime={currentTime} />
                            <Volume volume={volume} updateVolume={updateVolume} />
                        </React.Fragment>
                    }
                    right={<FullScreen isFullScreen={isFullScreen} updateFullScreen={updateFullScreen} />}
                />
            </PLayerWrapper>
        </Provider>,
    )

    return (
        <Provider>
            <PLayerWrapper isFullScreen={isFullScreen} onClick={onPlayerClick} onMouseMove={onMouseMove}>
                <Video
                    // controls
                    src="https://znews-mcloud-bf-s2-te-vnso-pt-4.zadn.vn/bGP61EP30DM/6ff10a041abff1e1a8ae/8b13e1024fa9a4f7fdb8/480/a5a026aea4fb4da514ea.mp4?authen=exp=1624613018~acl=/bGP61EP30DM/*~hmac=d3143453dd209ccfb94e4167b2794b27"
                    // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                    ref={videoRef}
                    onCanPlay={() => {
                        console.log('onCanPlay')
                    }}
                    onCanPlayThrough={() => {
                        console.log('onCanPlayThrough')
                    }}
                    onLoadedData={() => {
                        console.log('onLoadedData')
                    }}
                    onRateChange={() => {
                        console.log('onRateChange')
                    }}
                    onLoadedMetadata={() => {
                        console.log('onLoadedMetadata')
                    }}
                    onLoadStart={() => {
                        console.log('onLoadStart')
                    }}
                    onSuspend={() => {
                        console.log('onSuspend')
                    }}
                    onWaiting={onWaiting}
                    onPlaying={onPlaying}
                    onPlay={onPlay}
                    onEnded={onEnd}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onVolumeChange={onVolumeChange}
                    onDurationChange={onDurationChange}
                />

                {(!isPlay || !isPlaying) && <BigPlayButton onClick={onTogglePlayPauseClick} />}

                <Spinner isWaiting={isWaiting} />

                <ToolbarWrapper
                    showToolbar={showToolbar}
                    left={
                        <React.Fragment>
                            <PlayButton isPlaying={isPlaying} />
                            <Timer duration={duration} currentTime={currentTime} />
                            <Volume volume={volume} updateVolume={updateVolume} />
                        </React.Fragment>
                    }
                    right={<FullScreen isFullScreen={isFullScreen} updateFullScreen={updateFullScreen} />}
                />
            </PLayerWrapper>
        </Provider>
    )
}

export default Player
