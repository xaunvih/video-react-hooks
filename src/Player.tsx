import React, { MouseEvent } from 'react'
import Provider from './Context'
import styled from 'styled-components'
import GlobalStyles from './GlobalStyles'
import Spinner from './Spinner'
import FullScreen from './ToolbarFullScreen'
import BigPlayButton from './BigPlayButton'
import Timer from './ToolbarTimer'

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

const PLayerWrapper = styled.div`
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

    &:hover {
        ${Toolbar} {
            opacity: 1;
        }
    }
`

const Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

/**
 * Url: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
 * Video: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
function Player(): JSX.Element {
    const [isPlay, updatePlay] = React.useState<boolean>(false)
    const [isPlaying, updatePlaying] = React.useState<boolean>(false)
    const [isFullScreen, updateFullScreen] = React.useState<boolean>(false)
    const [isShowSpinner, updateShowSpinner] = React.useState<boolean>(false)
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
        updateShowSpinner(true)
    }

    function onPlaying() {
        updateShowSpinner(false)
        updatePlaying(true)
    }

    function onPlay() {
        updatePlay(true)
    }

    function onEnd() {
        updatePlay(false)
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
    }

    function onDurationChange() {
        updateDuration(videoRef.current.duration)
    }

    return (
        <Provider>
            <PLayerWrapper onClick={onPlayerClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <GlobalStyles />
                <Video
                    muted
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
                        src="https://znews-mcloud-bf-s2-te-vnso-zn-1.zadn.vn/PvkRW0YePFg/9eead13bfb00105e4911/a8d9f04c4279a927f068/480/836918c7bc8c55d20c9d.mp4?authen=exp=1618917121~acl=/PvkRW0YePFg/*~hmac=0a32757aa463175e37db063745cbaf4e"
                        type="video/mp4"
                    />
                </Video>

                {(!isPlay || !isPlaying) && <BigPlayButton onClick={onTogglePlayPauseClick} />}
                {isShowSpinner && <Spinner />}

                <Toolbar>
                    <div>
                        <button>
                            <Icon title="PlayButton" className="material-icons">
                                {isPlaying ? 'pause' : 'play_arrow'}
                            </Icon>
                        </button>
                        <Timer duration={duration} currentTime={currentTime} />
                        <button>
                            <Icon className="material-icons">volume_up</Icon>
                        </button>
                    </div>
                    <FullScreen isFullScreen={isFullScreen} updateFullScreen={updateFullScreen} />
                </Toolbar>
            </PLayerWrapper>
        </Provider>
    )
}

export default Player

// volume_off volume_mute volume_down volume_up
