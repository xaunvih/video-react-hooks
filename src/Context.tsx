import React, { useReducer, useContext } from 'react'

type PLAY = {
    type: 'PLAY'
    payload: any
}

type PAUSE = {
    type: 'PAUSE'
    payload: any
}

const initialState = {
    play: false,
    pause: false,
}

type StateType = typeof initialState
type ActionTypes = PLAY | PAUSE

function reducer(state: StateType, action: ActionTypes): StateType {
    switch (action.type) {
        case 'PAUSE':
            return {
                ...state,
                pause: true,
                play: false,
            }

        case 'PLAY':
            return {
                ...state,
                pause: false,
                play: true,
            }

        default:
            return state
    }
}

type ContextType = {
    state: StateType
    dispatch: React.Dispatch<ActionTypes>
}

const VideoContext = React.createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
})

VideoContext.displayName = 'VideoContext'

interface IProps {
    children: React.ReactNode
}

function Provider({ children }: IProps): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <VideoContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </VideoContext.Provider>
    )
}

function useVideoContext(): ContextType {
    return useContext(VideoContext)
}

export { VideoContext, useVideoContext }
export default Provider
