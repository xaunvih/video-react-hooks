import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
interface IToolbarSeek {
    onSeekTime: (time: number) => void
}

const Seekbar = styled.div`
    width: 100%;

    input {
        width: 100%;
        height: 3px;
    }
`

function ToolbarSeek(props: IToolbarSeek): JSX.Element {
    const { onSeekTime } = props
    const { state } = useVideoContext()
    const { duration, currentTime } = state

    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
        onSeekTime(Number(evt.target.value))
    }

    return (
        <Seekbar>
            <input type="range" min={0} max={duration} value={currentTime} onChange={onChange} />
        </Seekbar>
    )
}

export default ToolbarSeek
