import React from 'react'
import styled from 'styled-components'
import { useVideoStateContext } from '../context/Context'
import { SpinnerLinnearKeyFrames, SpinnerEaseKeyFrames, SpinnerLeftKeyFrames, SpinnerRightKeyFrames } from '../styles/animations'

const SpinnerWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    z-index: 1;
    pointer-events: none;
`

const SpinnerContainer = styled.div`
    pointer-events: none;
    position: absolute;
    width: 100%;
    padding-bottom: 100%;
    top: 50%;
    left: 50%;
    margin-top: -50%;
    margin-left: -50%;
    animation: ${SpinnerLinnearKeyFrames} 1568.23529647ms linear infinite;
`

const SpinnerRotator = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    animation: ${SpinnerEaseKeyFrames} 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
`

const SpinnerLeft = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    right: 49%;
`

const SpinnerRight = styled(SpinnerLeft)`
    left: 49%;
    right: unset;
`

const SpinnerCycle = styled.div`
    position: absolute;
    width: 200%;
    height: 100%;
    border-style: solid;
    border-color: #ddd #ddd transparent;
    border-radius: 50%;
    border-width: 4px;
`

const SpinnerCycleLeft = styled(SpinnerCycle)`
    left: 0;
    right: -100%;
    border-right-color: transparent;
    animation: ${SpinnerLeftKeyFrames} 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
`

const SpinnerCycleRight = styled(SpinnerCycleLeft)`
    left: -100%;
    right: 0;
    animation-name: ${SpinnerRightKeyFrames};
`

const S = { SpinnerWrapper, SpinnerContainer, SpinnerRotator, SpinnerLeft, SpinnerCycleLeft, SpinnerRight, SpinnerCycleRight }

function Spinner(): React.ReactElement {
    const { state } = useVideoStateContext()
    const { isWaiting } = state

    return (
        <S.SpinnerWrapper hidden={!isWaiting}>
            <S.SpinnerContainer>
                <S.SpinnerRotator>
                    <S.SpinnerLeft>
                        <S.SpinnerCycleLeft />
                    </S.SpinnerLeft>
                    <S.SpinnerRight>
                        <S.SpinnerCycleRight />
                    </S.SpinnerRight>
                </S.SpinnerRotator>
            </S.SpinnerContainer>
        </S.SpinnerWrapper>
    )
}

export default Spinner
