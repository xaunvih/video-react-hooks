import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
import Slider from './Slider'
interface IToolbarSeek {
    onSeekTime: (time: number) => void
}

const Seekbar = styled.div`
    width: 100%;
`

function ToolbarSeek(props: IToolbarSeek): JSX.Element {
    const { onSeekTime } = props
    const { state } = useVideoContext()
    const { duration, currentTime } = state

    function onChange(value: number) {
        console.log('seek: ', value)
        onSeekTime(value)
    }

    return (
        <Seekbar>
            <Slider min={0} max={duration} value={currentTime} onChange={onChange} />
        </Seekbar>
    )
}

export default ToolbarSeek
