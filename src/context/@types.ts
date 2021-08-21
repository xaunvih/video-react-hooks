export type ActionTypes = {
    type: string
    payload?: any
}

export interface ContextType {
    state: StateType | any
    dispatch: React.Dispatch<ActionTypes>
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
    seekingTime?: number
    buffered?: number
    seeking?: boolean
    playbackRate?: number
    muted?: boolean
    readyState?: number
    networkState?: number
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
