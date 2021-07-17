import React from 'react'
import styled from 'styled-components'

interface IToolbarSeek {
    currentTime: number
    duration: number
    updateSeekTime: (time: number) => void
}

const Seekbar = styled.div`
    width: 100%;

    input {
        width: 100%;
        height: 3px;
    }
`

function ToolbarSeek(props: IToolbarSeek): JSX.Element {
    const { currentTime, duration, updateSeekTime } = props

    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
        updateSeekTime(Number(evt.target.value))
    }

    return (
        <Seekbar>
            <input type="range" min={0} max={duration} value={currentTime} onChange={onChange} />
        </Seekbar>
    )
}

export default ToolbarSeek
