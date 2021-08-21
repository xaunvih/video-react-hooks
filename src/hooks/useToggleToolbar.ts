import { useCallback, useEffect, useRef } from 'react'
import { useVideoContext } from '../context/Context'
import { SHOW_TOOL_BAR } from '../context/types'

function useToggleToolbar() {
    const { state, dispatch } = useVideoContext()
    const { isPlaying, showToolbar, isEnded, isPause } = state
    const timeoutRef = useRef<number>(0)

    const toggleToolbar = useCallback(
        (showToolbar: boolean, timeout: number) => {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = window.setTimeout(() => {
                dispatch({
                    type: SHOW_TOOL_BAR,
                    payload: {
                        showToolbar,
                    },
                })
            }, timeout)
        },
        [dispatch],
    )

    function onMouseMoveCapture() {
        if (isPlaying && !showToolbar) {
            dispatch({
                type: SHOW_TOOL_BAR,
                payload: {
                    showToolbar: true,
                },
            })

            toggleToolbar(false, 4000)
        }
    }

    function onMouseOut() {
        if (isPlaying && showToolbar) {
            toggleToolbar(false, 0)
        }
    }

    useEffect(() => {
        if (isEnded || isPause) {
            toggleToolbar(true, 0)
        }
    }, [isEnded, isPause, toggleToolbar])

    useEffect(() => {
        if (isPlaying) {
            toggleToolbar(false, 4000)
        }
    }, [isPlaying, toggleToolbar])

    return {
        onMouseMoveCapture,
        onMouseOut,
    }
}

export { useToggleToolbar }
