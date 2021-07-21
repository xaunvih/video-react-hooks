import { ReactEventHandler } from 'react'

export type ActionTypes = {
    type: string
    payload?: any
}

export interface ContextType {
    state: StateType | any
    dispatch: React.Dispatch<ActionTypes>
}

export interface StateTypeMore {
    currentSrc: string
    duration: number
    currentTime: number
    seekingTime: number
    buffered: number
    waiting: boolean
    seeking: boolean
    paused: boolean
    autoPaused: boolean
    ended: boolean
    playbackRate: number
    muted: boolean
    volume: number
    readyState: number
    networkState: number
    videoWidth: number
    videoHeight: number
    hasStarted: boolean
    userActivity: boolean
    isActive: boolean
    isFullscreen: boolean
}

export interface StateType {
    isPlay: boolean
    isPlaying: boolean
    isEnded: boolean
    isPause: boolean
    isWaiting: boolean
    isFullScreen: boolean
    isSuspensed: boolean
    showToolbar: boolean
    volume: number
    duration: number
    currentTime: number
    hasStarted: boolean
    videoEl: HTMLVideoElement | null
}

export interface VideoHTMLAttrs {
    src?: string
    autoPlay?: boolean
    controls?: boolean
    loop?: boolean
    muted?: boolean
    playsInline?: boolean
    preload?: string
    poster?: string
    height?: number | string
    width?: number | string
    mediaGroup?: string
    controlsList?: string
    crossOrigin?: string
    disablePictureInPicture?: boolean
    disableRemotePlayback?: boolean
}

export interface MediaEvents<T> {
    onAbort?: ReactEventHandler<T>
    onAbortCapture?: ReactEventHandler<T>
    onCanPlay?: ReactEventHandler<T>
    onCanPlayCapture?: ReactEventHandler<T>
    onCanPlayThrough?: ReactEventHandler<T>
    onCanPlayThroughCapture?: ReactEventHandler<T>
    onDurationChange?: ReactEventHandler<T>
    onDurationChangeCapture?: ReactEventHandler<T>
    onEmptied?: ReactEventHandler<T>
    onEmptiedCapture?: ReactEventHandler<T>
    onEncrypted?: ReactEventHandler<T>
    onEncryptedCapture?: ReactEventHandler<T>
    onEnded?: ReactEventHandler<T>
    onEndedCapture?: ReactEventHandler<T>
    onLoadedData?: ReactEventHandler<T>
    onLoadedDataCapture?: ReactEventHandler<T>
    onLoadedMetadata?: ReactEventHandler<T>
    onLoadedMetadataCapture?: ReactEventHandler<T>
    onLoadStart?: ReactEventHandler<T>
    onLoadStartCapture?: ReactEventHandler<T>
    onPause?: ReactEventHandler<T>
    onPauseCapture?: ReactEventHandler<T>
    onPlay?: ReactEventHandler<T>
    onPlayCapture?: ReactEventHandler<T>
    onPlaying?: ReactEventHandler<T>
    onPlayingCapture?: ReactEventHandler<T>
    onProgress?: ReactEventHandler<T>
    onProgressCapture?: ReactEventHandler<T>
    onRateChange?: ReactEventHandler<T>
    onRateChangeCapture?: ReactEventHandler<T>
    onSeeked?: ReactEventHandler<T>
    onSeekedCapture?: ReactEventHandler<T>
    onSeeking?: ReactEventHandler<T>
    onSeekingCapture?: ReactEventHandler<T>
    onStalled?: ReactEventHandler<T>
    onStalledCapture?: ReactEventHandler<T>
    onSuspend?: ReactEventHandler<T>
    onSuspendCapture?: ReactEventHandler<T>
    onTimeUpdate?: ReactEventHandler<T>
    onTimeUpdateCapture?: ReactEventHandler<T>
    onVolumeChange?: ReactEventHandler<T>
    onVolumeChangeCapture?: ReactEventHandler<T>
    onWaiting?: ReactEventHandler<T>
    onWaitingCapture?: ReactEventHandler<T>
}
