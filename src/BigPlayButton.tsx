import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
import Icon from './Icon'

const Button = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);

    span {
        font-size: 80px;
    }
`

interface IBigPlayButton {
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

function BigPlayButton(props: IBigPlayButton): JSX.Element {
    const { state } = useVideoContext()
    const { isPlay, isPlaying } = state
    const isHidden = isPlay || isPlaying

    return (
        <Button onClick={props.onClick} hidden={isHidden}>
            <Icon name="play_circle_filled" />
        </Button>
    )
}

export default BigPlayButton
