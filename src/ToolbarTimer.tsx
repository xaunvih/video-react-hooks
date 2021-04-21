import React from 'react'
import styled from 'styled-components'
import { formatTime } from './utils'

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

    span {
        color: #fff;
        font-size: 14px;
    }
`

const Divider = styled.span`
    padding: 0 3px;
`

function Timer({ currentTime, duration }: ITimer): JSX.Element {
    return (
        <TimerWrapper>
            <span>{formatTime(currentTime)}</span>
            <Divider>/</Divider>
            <span>{formatTime(duration)}</span>
        </TimerWrapper>
    )
}

Timer.defaultProps = {
    currentTime: 0,
    duration: 0,
}

export default Timer
