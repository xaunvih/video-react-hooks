import React from 'react'
import styled from 'styled-components'

interface ITimer {
    currentTime: number
    duration: number
}

const TimerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 1px;
    padding: 8px;

    span {
        color: #fff;
        font-size: 14px;

        &:nth-child(2) {
            padding: 0 4px;
        }
    }
`

function Timer({ currentTime, duration }: ITimer): JSX.Element {
    const formatedDuration = React.useMemo(() => {
        return formatTime(duration)
    }, [duration])

    return (
        <TimerWrapper>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatedDuration}</span>
        </TimerWrapper>
    )
}

function formatTime(seconds = 0, guide: number = seconds): string {
    let s: any = Math.floor(seconds % 60)
    let m: any = Math.floor((seconds / 60) % 60)
    let h: any = Math.floor(seconds / 3600)

    const gm = Math.floor((guide / 60) % 60)
    const gh = Math.floor(guide / 3600)

    if (isNaN(seconds) || seconds === Infinity) {
        h = '-'
        m = '-'
        s = '-'
    }

    h = h > 0 || gh > 0 ? `${h}:` : ''
    m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`
    s = s < 10 ? `0${s}` : s

    return h + m + s
}

export default Timer
