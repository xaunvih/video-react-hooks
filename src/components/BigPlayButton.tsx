import React from 'react'
import styled from 'styled-components'
import { useVideoStateContext } from '../context/Context'
import { PlayCicleFilledIcon } from './Icon'

const S = {
    Button: styled.button`
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%) scale(3.5);
    `,
}

interface IProps {
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

function BigPlayButton(props: IProps): React.ReactElement {
    const { state } = useVideoStateContext()
    const { isPlay: isHidden } = state

    return (
        <S.Button onClick={props.onClick} hidden={isHidden}>
            <PlayCicleFilledIcon />
        </S.Button>
    )
}

export default BigPlayButton
