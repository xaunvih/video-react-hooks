import React from 'react'
import styled from 'styled-components'
import { useVideoStateContext } from '../context/Context'
import { colors, fontSizes, standartSpacingPoint } from '../styles'
import { formatTime } from '../utils'

const S = {} as any

S.TimerBox = styled.div`
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

interface IProps {
    duration: number
    currentTime: number
}

const Timer = React.memo((props: IProps) => {
    const { duration, currentTime } = props
    const formatedDuration = React.useMemo(() => {
        return formatTime(duration)
    }, [duration])

    return (
        <S.TimerBox>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatedDuration}</span>
        </S.TimerBox>
    )
})

function TimerWithContext(): React.ReactElement {
    const { state } = useVideoStateContext()
    const { duration, currentTime } = state
    return <Timer duration={duration} currentTime={currentTime} />
}

export default TimerWithContext
