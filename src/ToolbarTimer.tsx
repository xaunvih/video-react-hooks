import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
import { colors, fontSizes, standartSpacingPoint } from './styles'

const TimerWrapper = styled.div`
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

function Timer(): JSX.Element {
    const { state } = useVideoContext()
    const { duration, currentTime } = state

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
