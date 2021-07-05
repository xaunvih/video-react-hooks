import React from 'react'
import Provider from './Context'
import styled, { css } from 'styled-components'
import CommonPlayerStyles from './stylesCommon'
import Spinner from './Spinner'
import FullScreen from './ToolbarFullScreen'
import BigPlayButton from './BigPlayButton'
import Timer from './ToolbarTimer'
import Volume from './ToolbarVolume'
import PlayButton from './ToolbarPlayButton'
import PictureinPicture from './ToolbarPictureinPicture'
import ToolbarWrapper from './Toolbar'
import LocalStorage from './utilsLocalStorage'

interface PlayerStylesWrapper {
    isFullScreen: boolean
}

const PLayerWrapper = styled(CommonPlayerStyles)<PlayerStylesWrapper>`
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

function Player(): JSX.Element {
    const [isPlay, updatePlay] = React.useState<boolean>(false)
    const [isPlaying, updatePlaying] = React.useState<boolean>(false)
    const [isEnded, updateEnded] = React.useState<boolean>(false)
    const [isPause, updatePause] = React.useState<boolean>(false)
    const [isWaiting, updateWaiting] = React.useState<boolean>(false)
    const [isFullScreen, updateFullScreen] = React.useState<boolean>(false)
    const [volume, updateVolume] = React.useState<number>(() => {
        const { value } = LocalStorage.get(LocalStorage.keys.VOLUME)
        if (value) return Number(value)
        return 1
    })

    const [duration, updateDuration] = React.useState<number>(0)
    const [currentTime, updateCurrentTime] = React.useState<number>(0)
    const videoRef = React.useRef<HTMLVideoElement>(null!)
    const [showToolbar, setShowToolbar] = React.useState<boolean>(true)

    function onTogglePlayPauseClick() {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    function requestPictureInPicture() {
        videoRef.current.requestPictureInPicture()
    }

    const timeoutRef = React.useRef<number | null>(null)
    function onMouseMoveCapture() {
        if (isPlaying && !showToolbar) {
            setShowToolbar(true)

            window.clearTimeout(timeoutRef.current || 0)
            timeoutRef.current = window.setTimeout(() => {
                setShowToolbar(false)
            }, 4000)
        }
    }

    function onMouseOutCapture() {
        if (isPlaying && showToolbar) {
            window.clearTimeout(timeoutRef.current || 0)
            setShowToolbar(false)
        }
    }

    React.useEffect(() => {
        if (isEnded || isPause) {
            window.clearTimeout(timeoutRef.current || 0)
            setShowToolbar(true)
        }
    }, [isEnded, isPause])

    function onPlayerClick(evt: React.MouseEvent<HTMLDivElement>) {
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
        updateEnded(false)
    }

    function onPlay() {
        console.log('onPlay')
        updatePlay(true)
        updatePause(false)
        updateEnded(false)
    }

    function onEnd() {
        console.log('onEnd')
        updatePlay(false)
        updateEnded(true)
        updateFullScreen(false)
    }

    function onPause() {
        console.log('onPause')
        updatePlaying(false)
        updatePause(true)
    }

    function onTimeUpdate() {
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
    }, [volume])

    return (
        <Provider>
            <PLayerWrapper
                isFullScreen={isFullScreen}
                onClick={onPlayerClick}
                onMouseMoveCapture={onMouseMoveCapture}
                onMouseOutCapture={onMouseOutCapture}
            >
                <Video
                    src="https://znews-mcloud-bf-s2-te-vnso-pt-4.zadn.vn/bGP61EP30DM/6ff10a041abff1e1a8ae/8b13e1024fa9a4f7fdb8/480/a5a026aea4fb4da514ea.mp4?authen=exp=1624613018~acl=/bGP61EP30DM/*~hmac=d3143453dd209ccfb94e4167b2794b27"
                    // src="https://interactive-exa mples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                    ref={videoRef}
                    onCanPlay={() => console.log('onCanPlay')}
                    onCanPlayThrough={() => console.log('onCanPlayThrough')}
                    onLoadedData={() => console.log('onLoadedData')}
                    onRateChange={() => console.log('onRateChange')}
                    onLoadedMetadata={() => console.log('onLoadedMetadata')}
                    onLoadStart={() => console.log('onLoadStart')}
                    onSuspend={() => console.log('onSuspend')}
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

                <ToolbarWrapper showToolbar={showToolbar}>
                    <PlayButton isPlaying={isPlaying} onClick={onTogglePlayPauseClick} />
                    <Timer duration={duration} currentTime={currentTime} />
                    <Volume volume={volume} updateVolume={updateVolume} />

                    <PictureinPicture onClick={requestPictureInPicture} />
                    <FullScreen isFullScreen={isFullScreen} updateFullScreen={updateFullScreen} />
                </ToolbarWrapper>
            </PLayerWrapper>
        </Provider>
    )
}

export default Player
