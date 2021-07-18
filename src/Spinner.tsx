import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useVideoContext } from './Context'

const SpinnerLinnearKeyFrames = keyframes`
    to {
        transform: rotate(360deg);
    }
`

const SpinnerEaseKeyFrames = keyframes`
    12.5% {
        transform: rotate(135deg);
    }

    25% {
        transform: rotate(270deg);
    }

    37.5% {
        transform: rotate(405deg);
    }

    50% {
        transform: rotate(540deg);
    }
    
    62.5% {
        transform: rotate(675deg);
    }

    75% {
        transform: rotate(810deg);
    }

    87.5% {
        transform: rotate(945deg);
    }

    to {
        transform: rotate(1080deg);
    }
`

const SpinnerLeftKeyFrames = keyframes`
    0% {
        transform: rotate(130deg);
    }
    
    50% {
        transform: rotate(-5deg);
    }

    to {
        transform: rotate(130deg);
    }
`

const SpinnerRightKeyFrames = keyframes`
    0% {
        transform: rotate(-130deg);
    }

    50% {
        transform: rotate(5deg);
    }
    
    to {
        transform: rotate(-130deg);
    }
`

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
    box-sizing: border-box;
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

function Spinner(): JSX.Element {
    const { state } = useVideoContext()
    const { isWaiting } = state

    return (
        <SpinnerWrapper hidden={!isWaiting}>
            <SpinnerContainer>
                <SpinnerRotator>
                    <SpinnerLeft>
                        <SpinnerCycleLeft />
                    </SpinnerLeft>
                    <SpinnerRight>
                        <SpinnerCycleRight />
                    </SpinnerRight>
                </SpinnerRotator>
            </SpinnerContainer>
        </SpinnerWrapper>
    )
}

export default Spinner
