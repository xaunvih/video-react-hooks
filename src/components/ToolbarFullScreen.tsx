import React from 'react'
import { useFullscreen } from '../hooks/useFullScreen'
import { useVideoStateContext } from '../context/Context'
import { FULL_SCREEN } from '../context/types'
import { FullscreenExitIcon, FullscreenIcon } from './Icon'
import { ActionTypes } from '../context/@types'

interface IProps {
    dispatch: React.Dispatch<ActionTypes>
}

const FullScreen = React.memo((props: IProps) => {
    const { dispatch } = props
    const { isFullscreen, toggle } = useFullscreen({
        onChange: (_, isOpen) =>
            dispatch({
                type: FULL_SCREEN,
                payload: { isFullScreen: isOpen },
            }),
    })

    const icon = isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />
    const onClick = () => toggle()

    return <button onClick={onClick}>{icon}</button>
})

function FullScreenWithContext(): React.ReactElement {
    const { dispatch } = useVideoStateContext()
    return <FullScreen dispatch={dispatch} />
}

export default FullScreenWithContext
