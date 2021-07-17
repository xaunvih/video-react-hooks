import React from 'react'
import Provider from './Context'
import PlayerWrapper from './PlayerWrapper'
import Spinner from './Spinner'
import Poster from './Poster'
import FullScreen from './ToolbarFullScreen'
import BigPlayButton from './BigPlayButton'
import Timer from './ToolbarTimer'
import Volume from './ToolbarVolume'
import PlayButton from './ToolbarPlayButton'
import PictureinPicture from './ToolbarPictureinPicture'
import SeekBar from './ToolbarSeek'
import ToolbarWrapper, { ToolbarSpace } from './Toolbar'

function Player(): JSX.Element {
    const [isPlay, updatePlay] = React.useState<boolean>(false)
    const [isPlaying, updatePlaying] = React.useState<boolean>(false)
    const [isEnded, updateEnded] = React.useState<boolean>(false)
    const [isPause, updatePause] = React.useState<boolean>(false)
    const [isWaiting, updateWaiting] = React.useState<boolean>(false)

    const [isFullScreen, updateFullScreen] = React.useState<boolean>(false)
    const [volume, updateVolume] = React.useState<number>(0)
    const [duration, updateDuration] = React.useState<number>(0)
    const [currentTime, updateCurrentTime] = React.useState<number>(0)
    const [isSuspensed, updateSuspensed] = React.useState<boolean>(false)
    const [showToolbar, setShowToolbar] = React.useState<boolean>(true)

    const videoRef = React.useRef<HTMLVideoElement>(null!)

    function onTogglePlayPauseClick() {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    function onVideoClick(evt: React.MouseEvent<HTMLVideoElement>) {
        const $target = evt.target as HTMLElement
        const tagName = $target.tagName.toLowerCase()
        if (tagName === 'video') {
            videoRef.current.pause()
        }
    }

    function requestPictureInPicture() {
        videoRef.current.requestPictureInPicture()
    }

    const updateSeekTime = (time: number) => (videoRef.current.currentTime = time)

    function onWaiting() {
        updateWaiting(true)
    }

    function onPlaying() {
        updateWaiting(false)
        updatePlaying(true)
        updatePause(false)
        updateEnded(false)
    }

    function onPlay() {
        updatePlay(true)
        updatePause(false)
        updateEnded(false)
    }

    function onEnd() {
        updatePlay(false)
        updateEnded(true)
    }

    function onPause() {
        updatePlaying(false)
        updatePause(true)
    }

    function onTimeUpdate() {
        const currentTime = Math.round(videoRef.current.currentTime || 0)
        updateCurrentTime(currentTime)
    }

    function onVolumeChange() {
        const volume = videoRef.current.volume || 0
        updateVolume(volume)
    }

    function onDurationChange() {
        updateDuration(videoRef.current.duration)
    }

    React.useEffect(() => {
        videoRef.current.volume = volume
    }, [volume])

    return (
        <Provider>
            <PlayerWrapper
                isPlaying={isPlaying}
                showToolbar={showToolbar}
                isEnded={isEnded}
                isPause={isPause}
                isFullScreen={isFullScreen}
                setShowToolbar={setShowToolbar}
            >
                <video
                    src="https://nusid.net/video.mp4"
                    // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                    ref={videoRef}
                    onClick={onVideoClick}
                    onCanPlay={() => console.log('onCanPlay')}
                    onCanPlayThrough={() => console.log('onCanPlayThrough')}
                    onLoadedData={() => console.log('onLoadedData')}
                    onRateChange={() => console.log('onRateChange')}
                    onLoadedMetadata={() => console.log('onLoadedMetadata')}
                    onLoadStart={() => console.log('onLoadStart')}
                    onSuspend={() => console.log('onSuspend -- load progressbar')}
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
                {(!isPlay || !isPlaying) && <Poster />}

                <Spinner isWaiting={isWaiting} />

                <ToolbarWrapper showToolbar={showToolbar}>
                    <SeekBar duration={duration} currentTime={currentTime} updateSeekTime={updateSeekTime} />
                    <PlayButton isPlaying={isPlaying} onClick={onTogglePlayPauseClick} />
                    <Timer duration={duration} currentTime={currentTime} />
                    <Volume volume={volume} updateVolume={updateVolume} />
                    <ToolbarSpace />
                    <PictureinPicture onClick={requestPictureInPicture} />
                    <FullScreen isEnded={isEnded} updateFullScreen={updateFullScreen} />
                </ToolbarWrapper>
            </PlayerWrapper>
        </Provider>
    )
}

export default Player
