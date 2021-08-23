import React from 'react'
import { useVideoStateContext } from '../context/Context'
import { PlayArrowIcon, PauseIcon } from './Icon'

interface IProps {
    onClick: () => void
}

function PlayButton({ onClick }: IProps): React.ReactElement {
    const { state } = useVideoStateContext()
    const { isPlaying } = state
    const icon = isPlaying ? <PauseIcon /> : <PlayArrowIcon />

    return <button onClick={onClick}>{icon}</button>
}

export default PlayButton
