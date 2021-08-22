import React, { useReducer, useContext, useMemo, useRef } from 'react'
import { StateType, ContextType } from './@types'
import { reducer } from './reducer'

const initialState: StateType = {
    isPlay: false,
    isPlaying: false,
    isEnded: false,
    isPause: false,
    isWaiting: false,
    isFullScreen: false,
    isSuspensed: false,
    showToolbar: true,
    volume: 1,
    duration: 0,
    currentTime: 0,
    hasStarted: false,
}

const VideoRefContext = React.createContext(null)
const VideoStateContext = React.createContext<ContextType>({
    state: {},
    dispatch: () => {},
})

VideoStateContext.displayName = 'VideoStateContext'
VideoRefContext.displayName = 'VideoRefContext'

function VideoStateProvider({ children }): React.ReactElement {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = useMemo(() => {
        return {
            state,
            dispatch,
        }
    }, [state])

    return <VideoStateContext.Provider value={value}>{children}</VideoStateContext.Provider>
}

function VideoRefProvider({ children }): React.ReactElement {
    const videoRef = useRef(null)
    return <VideoRefContext.Provider value={videoRef}>{children}</VideoRefContext.Provider>
}

function useVideoStateContext() {
    return useContext(VideoStateContext)
}

function useVideoRefContext() {
    return useContext(VideoRefContext)
}

export { useVideoStateContext, useVideoRefContext, VideoRefProvider, VideoStateProvider as default }
