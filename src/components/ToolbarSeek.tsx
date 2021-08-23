import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useVideoStateContext } from '../context/Context'
import Slider from './Slider'
import { standartSpacingPoint } from '../styles'

interface IProps {
    onSeekTime: (time: number) => void
}

const S = {} as any

S.Seekbar = styled.div`
    width: 100%;
    padding: 0 ${standartSpacingPoint};
`

function ToolbarSeek(props: IProps): React.ReactElement {
    const { onSeekTime } = props
    const { state } = useVideoStateContext()
    const { duration, currentTime } = state

    const onChange = useCallback(
        (value: number) => {
            onSeekTime(value)
        },
        [onSeekTime],
    )

    return (
        <S.Seekbar>
            <Slider min={0} max={duration} value={currentTime} onChange={onChange} />
        </S.Seekbar>
    )
}

export default ToolbarSeek
