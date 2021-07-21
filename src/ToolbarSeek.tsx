import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
import Slider from './Slider'
import { standartSpacingPoint } from './styles'

interface IToolbarSeek {
    onSeekTime: (time: number) => void
}

const Seekbar = styled.div`
    width: 100%;
    padding: 0 ${standartSpacingPoint};
`

function ToolbarSeek(props: IToolbarSeek): JSX.Element {
    const { onSeekTime } = props
    const { state } = useVideoContext()
    const { duration, currentTime } = state

    const onChange = useCallback(
        (value: number) => {
            onSeekTime(value)
        },
        [onSeekTime],
    )

    return (
        <Seekbar>
            <Slider min={0} max={duration} value={currentTime} onChange={onChange} />
        </Seekbar>
    )
}

export default ToolbarSeek
