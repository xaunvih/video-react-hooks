import React from 'react'
import styled from 'styled-components'

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

interface IPlayButton {
    isPlaying: boolean
}

function PlayButton({ isPlaying }: IPlayButton): JSX.Element {
    return (
        <button>
            <Icon title="PlayButton" className="material-icons">
                {isPlaying ? 'pause' : 'play_arrow'}
            </Icon>
        </button>
    )
}

PlayButton.defaultProps = {
    isPlaying: false,
}

export default PlayButton
