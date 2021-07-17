import React from 'react'
import styled from 'styled-components'

const BigButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
`

const Icon = styled.span`
    color: #fff;
`

const BigButtonIcon = styled(Icon)`
    font-size: 80px;
`

interface IBigPlayButton {
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

function BigPlayButton({ onClick }: IBigPlayButton): JSX.Element {
    return (
        <BigButton onClick={onClick}>
            <BigButtonIcon className="material-icons"> play_circle_filled </BigButtonIcon>
        </BigButton>
    )
}

BigPlayButton.defaultProps = {
    onClick: () => {},
}

export default BigPlayButton
