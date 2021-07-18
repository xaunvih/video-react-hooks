import React from 'react'
import { useVideoContext } from './Context'
import Icon from './Icon'

interface IPlayButton {
    onClick: () => void
}

function PlayButton({ onClick }: IPlayButton): JSX.Element {
    const { state } = useVideoContext()
    const { isPlaying } = state
    const icon = isPlaying ? 'pause' : 'play_arrow'

    return (
        <button onClick={onClick}>
            <Icon name={icon}></Icon>
        </button>
    )
}

export default PlayButton
