import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
import { colors, fontSizes, standartSpacingPoint } from './styles'

const TimerBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 1px;
    padding: ${standartSpacingPoint}px;

    span {
        color: ${colors.white};
        font-size: ${fontSizes.normal};

        &:nth-child(2) {
            padding: 0 ${standartSpacingPoint / 2}px;
        }
    }
`

interface ITimerProps {
    duration: number
    currentTime: number
}

const Timer = React.memo((props: ITimerProps) => {
    const { duration, currentTime } = props
    const formatedDuration = React.useMemo(() => {
        return formatTime(duration)
    }, [duration])

    return (
        <TimerBox>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatedDuration}</span>
        </TimerBox>
    )
})

function TimerWrapper(): JSX.Element {
    const { state } = useVideoContext()
    const { duration, currentTime } = state

    return <Timer duration={duration} currentTime={currentTime} />
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

export default TimerWrapper
