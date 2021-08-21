import React from 'react'
import { useVideoContext } from '../context/Context'
import Icon from './Icon'

interface IProps {
    onClick: () => void
}

function PlayButton({ onClick }: IProps): React.ReactElement {
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
