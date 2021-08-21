import { StateType, ActionTypes } from './@types'
import {
    PLAYING,
    PLAY,
    PAUSE,
    END,
    TIME_UPDATE,
    WAITING,
    VOLUME_CHANGE,
    DURATION_CHANGE,
    SHOW_TOOL_BAR,
    FULL_SCREEN,
    HAS_STARTED,
} from './types'

function reducer(state: StateType, action: ActionTypes): StateType {
    switch (action.type) {
        case PLAYING:
            return {
                ...state,
                isPlaying: true,
                isWaiting: false,
                isEnded: false,
                isPause: false,
            }

        case PLAY:
            return {
                ...state,
                isPlay: true,
                isEnded: false,
                isPause: false,
            }

        case PAUSE:
            return {
                ...state,
                isPlay: false,
                isPlaying: false,
                isPause: true,
            }

        case END:
            return {
                ...state,
                isEnded: true,
                isPlay: false,
                isPlaying: false,
            }

        case WAITING:
            return {
                ...state,
                isWaiting: true,
            }

        case TIME_UPDATE:
            const { currentTime } = action.payload
            return {
                ...state,
                currentTime,
            }

        case VOLUME_CHANGE:
            const { volume } = action.payload
            return {
                ...state,
                volume,
            }

        case DURATION_CHANGE:
            const { duration } = action.payload
            return {
                ...state,
                duration,
            }

        case SHOW_TOOL_BAR:
            const { showToolbar } = action.payload
            return {
                ...state,
                showToolbar,
            }

        case FULL_SCREEN:
            const { isFullScreen } = action.payload
            return {
                ...state,
                isFullScreen,
            }

        case HAS_STARTED:
            return {
                ...state,
                hasStarted: true,
            }

        default:
            return state
    }
}

export { reducer }
