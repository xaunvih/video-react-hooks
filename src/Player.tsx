import React, { MouseEvent } from 'react'
import Provider from './Context'
import styled from 'styled-components'
import DefaultWrapper from './GlobalStyles'
import Spinner from './Spinner'
import FullScreen from './FullScreen'

const PLayerWrapper = styled(DefaultWrapper)`
    width: 600px;
    padding-bottom: 56.25%;
    position: relative;
`

const Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const BigPlayButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Icon = styled.span`
    color: #fff;
`

const BigPlayButtonIcon = styled(Icon)`
    font-size: 80px;
`

const Toolbar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
`

const Player = function Player(): JSX.Element {
    const [isPlay, updatePlay] = React.useState<boolean>(false)
    const [isPlaying, updatePlaying] = React.useState<boolean>(false)
    const [isShowSpinner, updateShowSpinner] = React.useState<boolean>(false)
    const videoRef = React.useRef<HTMLVideoElement>(null!)

    function onTogglePlayPauseClick(evt: MouseEvent<HTMLButtonElement>) {
        evt.stopPropagation()
        videoRef.current.play()
    }

    function onPlayerWrapperClick() {
        videoRef.current.pause()
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
    }

    function onVolumeChange() {
        const volume = videoRef.current.volume || 0
    }

    return (
        <Provider>
            <PLayerWrapper onClick={onPlayerWrapperClick}>
                <Video
                    ref={videoRef}
                    onWaiting={onWaiting}
                    onPlaying={onPlaying}
                    onPlay={onPlay}
                    onEnded={onEnd}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onVolumeChange={onVolumeChange}
                >
                    <source
                        src="https://znews-mcloud-bf-s2-te-vnso-zn-1.zadn.vn/PvkRW0YePFg/9eead13bfb00105e4911/a8d9f04c4279a927f068/480/836918c7bc8c55d20c9d.mp4?authen=exp=1618917121~acl=/PvkRW0YePFg/*~hmac=0a32757aa463175e37db063745cbaf4e"
                        type="video/mp4"
                    />
                </Video>

                {(!isPlay || !isPlaying) && (
                    <BigPlayButton onClick={onTogglePlayPauseClick}>
                        <BigPlayButtonIcon className="material-icons"> play_circle_filled </BigPlayButtonIcon>
                    </BigPlayButton>
                )}

                {isShowSpinner && <Spinner />}

                <Toolbar>
                    <Icon className="material-icons">play_arrow</Icon>
                    <Icon className="material-icons">pause</Icon>
                    <Icon className="material-icons">volume_up</Icon>
                    <Icon className="material-icons">volume_off</Icon>
                    <Icon className="material-icons">volume_mute</Icon>
                    <Icon className="material-icons">volume_down</Icon>
                    <Icon className="material-icons">more_vert</Icon>

                    <FullScreen />
                </Toolbar>
            </PLayerWrapper>
        </Provider>
    )
}

export default Player
