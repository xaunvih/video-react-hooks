import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useFullscreen } from './hooks/useFullScreen'

interface IProps {
    isEnded: boolean
    updateFullScreen: (isFullScreen: boolean) => void
}

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

function FullScreen(props: IProps): JSX.Element {
    const { isFullscreen, toggle, exit } = useFullscreen({
        onChange: (_, isOpen) => props.updateFullScreen(isOpen),
    })

    const { isEnded } = props
    const iconName = isFullscreen ? 'fullscreen_exit' : 'fullscreen'

    function onClick() {
        toggle()
    }

    useEffect(() => {
        if (isEnded) {
            exit()
        }
    }, [isEnded, exit])

    return (
        <button onClick={onClick}>
            <Icon className="material-icons">{iconName}</Icon>
        </button>
    )
}

export default FullScreen
