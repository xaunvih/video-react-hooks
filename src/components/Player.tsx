import React, { useCallback, useEffect, useRef } from 'react'
import { useVideoContext } from '../context/Context'
import { PLAY, PLAYING, END, PAUSE, WAITING, TIME_UPDATE, VOLUME_CHANGE, DURATION_CHANGE, HAS_STARTED } from '../context/types'
import Spinner from './Spinner'
import { useToggleToolbar } from '../hooks/useToggleToolbar'
import Poster from './Poster'
import BigPlayButton from './BigPlayButton'
import ToolbarFullScreen from './ToolbarFullScreen'
import ToolbarTimer from './ToolbarTimer'
import ToolbarVolume from './ToolbarVolume'
import ToolbarPlayButton from './ToolbarPlayButton'
import ToolbarPictureinPicture from './ToolbarPictureinPicture'
import ToolbarSeekBar from './ToolbarSeek'
import ToolbarWrapper, { S as SToolbar } from './Toolbar'
import styled, { css } from 'styled-components'
import CommonPlayer from '../styles/CommonPlayer'

const S = {} as any

S.PlayerWrapper = styled(CommonPlayer)<{ isFullScreen: boolean }>`
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

S.Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

function Player(): React.ReactElement {
    const videoRef = useRef<HTMLVideoElement>(null!)
    const { onMouseMoveCapture, onMouseOut } = useToggleToolbar()
    const { state, dispatch } = useVideoContext()
    const { volume, hasStarted, isFullScreen } = state

    function onWaiting() {
        dispatch({ type: WAITING })
    }

    function onPlaying() {
        dispatch({ type: PLAYING })
    }

    function onPlay() {
        dispatch({ type: PLAY })

        if (!hasStarted) {
            dispatch({ type: HAS_STARTED })
        }
    }

    function onEnd() {
        dispatch({ type: END })
    }

    function onPause() {
        dispatch({ type: PAUSE })
    }

    function onTimeUpdate() {
        dispatch({
            type: TIME_UPDATE,
            payload: {
                currentTime: Math.round(videoRef.current.currentTime || 0),
            },
        })
    }

    function onVolumeChange() {
        dispatch({
            type: VOLUME_CHANGE,
            payload: {
                volume: videoRef.current.volume || 0,
            },
        })
    }

    function onDurationChange() {
        dispatch({
            type: DURATION_CHANGE,
            payload: {
                duration: videoRef.current.duration,
            },
        })
    }

    function onVideoClick() {
        videoRef.current.pause()
    }

    function requestPictureInPicture() {
        videoRef.current.requestPictureInPicture()
    }

    const updateSeekTime = useCallback(function (time: number) {
        videoRef.current.currentTime = time
    }, [])

    const onTogglePlayClick = useCallback(function () {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [])

    useEffect(() => {
        videoRef.current.volume = volume
    }, [volume])

    return (
        <S.PlayerWrapper isFullScreen={isFullScreen} onMouseMoveCapture={onMouseMoveCapture} onMouseLeave={onMouseOut}>
            <S.Video
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                autoPlay={false}
                loop={false}
                muted={false}
                playsInline={true}
                disableRemotePlayback={false}
                ref={videoRef}
                onClick={onVideoClick}
                onWaiting={onWaiting}
                onPlaying={onPlaying}
                onPlay={onPlay}
                onEnded={onEnd}
                onPause={onPause}
                onTimeUpdate={onTimeUpdate}
                onVolumeChange={onVolumeChange}
                onDurationChange={onDurationChange}
                onCanPlay={() => console.log('onCanPlay')}
                onCanPlayThrough={() => console.log('onCanPlayThrough')}
                onLoadedData={() => console.log('onLoadedData')}
                onRateChange={() => console.log('onRateChange')}
                onLoadedMetadata={() => console.log('onLoadedMetadata')}
                onLoadStart={() => console.log('onLoadStart')}
                onSuspend={() => console.log('onSuspend')}
            />

            <BigPlayButton onClick={onTogglePlayClick} />
            <Poster />
            <Spinner />

            <ToolbarWrapper>
                <ToolbarSeekBar onSeekTime={updateSeekTime} />
                <ToolbarPlayButton onClick={onTogglePlayClick} />
                <ToolbarTimer />
                <ToolbarVolume />
                <SToolbar.ToolbarSpace />
                <ToolbarPictureinPicture onClick={requestPictureInPicture} />
                <ToolbarFullScreen />
            </ToolbarWrapper>
        </S.PlayerWrapper>
    )
}

export default Player
