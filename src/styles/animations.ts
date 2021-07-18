import { keyframes } from 'styled-components'

export const SpinnerLinnearKeyFrames = keyframes`
    to {
        transform: rotate(360deg);
    }
`

export const SpinnerEaseKeyFrames = keyframes`
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

export const SpinnerLeftKeyFrames = keyframes`
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

export const SpinnerRightKeyFrames = keyframes`
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
