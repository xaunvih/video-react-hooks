import React, { useEffect } from 'react'
import { useFullscreen } from './hooks/useFullScreen'
import { useVideoContext } from './Context'
import { FULL_SCREEN } from './context/types'
import Icon from './Icon'
import { ActionTypes } from './context/@types'

interface IFullScreenProps {
    isEnded: boolean
    dispatch: React.Dispatch<ActionTypes>
}

const FullScreen = React.memo((props: IFullScreenProps) => {
    const { isEnded, dispatch } = props
    const { isFullscreen, toggle, exit } = useFullscreen({
        onChange: (_, isOpen) =>
            dispatch({
                type: FULL_SCREEN,
                payload: { isFullScreen: isOpen },
            }),
    })

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
})

function FullScreenWrapper() {
    const { state, dispatch } = useVideoContext()
    const { isEnded } = state

    return <FullScreen isEnded={isEnded} dispatch={dispatch} />
}

export default FullScreenWrapper
