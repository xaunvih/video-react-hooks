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
