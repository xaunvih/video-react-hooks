import React, { useReducer, useContext, useMemo } from 'react'
import { StateType, ContextType } from './context/@types'
import { reducer } from './context/reducer'

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
    videoEl: null,
}

const VideoContext = React.createContext<ContextType>({
    state: {},
    dispatch: () => {},
})

VideoContext.displayName = 'VideoContext'

function Provider({ children }): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = useMemo(() => {
        return {
            state,
            dispatch,
        }
    }, [state])

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

function useVideoContext() {
    return useContext(VideoContext)
}

export { useVideoContext, Provider as default }
