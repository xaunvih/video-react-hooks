import React, { useCallback } from 'react'
import { useVideoContext } from './Context'
import { PLAY, PLAYING, END, PAUSE, WAITING, TIME_UPDATE, VOLUME_CHANGE, DURATION_CHANGE } from './context/types'
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
    const { volume } = state

    function onWaiting() {
        dispatch({ type: WAITING })
    }

    function onPlaying() {
        dispatch({ type: PLAYING })
    }

    function onPlay() {
        dispatch({ type: PLAY })
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

    React.useEffect(() => {
        videoRef.current.volume = volume
    }, [volume])

    return (
        <PlayerWrapper>
            <video
                src="https://nusid.net/video.mp4"
                // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                autoPlay={false}
                controls={false}
                loop={false}
                muted={false}
                playsInline={false}
                height="100%"
                poster=""
                width="100%"
                // crossOrigin=""
                // controlsList=""
                // mediaGroup=""
                // preload=""
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
