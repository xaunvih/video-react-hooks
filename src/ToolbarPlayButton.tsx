import React from 'react'
import styled from 'styled-components'

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

interface IPlayButton {
    isPlaying: boolean
    onClick: () => void
}

function PlayButton({ isPlaying, onClick }: IPlayButton): JSX.Element {
    return (
        <button onClick={onClick}>
            <Icon title="PlayButton" className="material-icons">
                {isPlaying ? 'pause' : 'play_arrow'}
            </Icon>
        </button>
    )
}

PlayButton.defaultProps = {
    isPlaying: false,
    onClick: () => {},
}

export default PlayButton
