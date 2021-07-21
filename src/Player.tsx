import React, { useCallback, useEffect } from 'react'
import { useVideoContext } from './Context'
import {
    PLAY,
    PLAYING,
    END,
    PAUSE,
    WAITING,
    TIME_UPDATE,
    VOLUME_CHANGE,
    DURATION_CHANGE,
    VIDEO_REF,
    HAS_STARTED,
} from './context/types'
import PlayerWrapper from './PlayerWrapper'
import Spinner from './Spinner'
import Poster from './Poster'
import BigPlayButton from './BigPlayButton'
import ToolbarFullScreen from './ToolbarFullScreen'
import ToolbarTimer from './ToolbarTimer'
import ToolbarVolume from './ToolbarVolume'
import ToolbarPlayButton from './ToolbarPlayButton'
import ToolbarPictureinPicture from './ToolbarPictureinPicture'
import ToolbarSeekBar from './ToolbarSeek'
import ToolbarWrapper, { ToolbarSpace } from './Toolbar'

function Player(): JSX.Element {
    const videoRef = React.useRef<HTMLVideoElement>(null!)
    const { state, dispatch } = useVideoContext()
    const { volume, hasStarted } = state

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

    useEffect(() => {
        function dispatchVideoEl(el: HTMLVideoElement | null) {
            dispatch({
                type: VIDEO_REF,
                payload: {
                    videoEl: el,
                },
            })
        }

        dispatchVideoEl(videoRef.current)
        return () => dispatchVideoEl(null)
    }, [dispatch])

    return (
        <PlayerWrapper>
            <video
                // src="https://nusid.net/video.mp4"
                // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                // src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                src="https://znews-mcloud-bf-s2-te-vnso-pt-15.zadn.vn/Vopc6ZS0z-4/63794d53c42d2e73773c/75460f6c3c03d65d8f12/480/da3702dd84896dd73498.mp4?authen=exp=1626764622~acl=/Vopc6ZS0z-4/*~hmac=81d7b72215a9bfad312ec08ca64c89dc"
                autoPlay={false}
                controls={false}
                loop={false}
                muted={false}
                playsInline={true}
                height="100%"
                poster=""
                width="100%"
                disablePictureInPicture={false}
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
                <ToolbarSpace />
                <ToolbarPictureinPicture onClick={requestPictureInPicture} />
                <ToolbarFullScreen />
            </ToolbarWrapper>
        </PlayerWrapper>
    )
}

export default Player
