import React, { useEffect } from 'react'
import { useFullscreen } from './hooks/useFullScreen'
import { useVideoContext } from './Context'
import { FULL_SCREEN } from './context/types'
import Icon from './Icon'

function FullScreen(): JSX.Element {
    const { state, dispatch } = useVideoContext()
    const { isFullscreen, toggle, exit } = useFullscreen({
        onChange: (_, isOpen) =>
            dispatch({
                type: FULL_SCREEN,
                payload: { isFullScreen: isOpen },
            }),
    })

    const { isEnded } = state
    const iconName = isFullscreen ? 'fullscreen_exit' : 'fullscreen'
    const onClick = () => toggle()

    useEffect(() => {
        if (isEnded) {
            exit()
        }
    }, [isEnded, exit])

    return (
        <button onClick={onClick}>
            <Icon name={iconName} />
        </button>
    )
}

export default FullScreen
