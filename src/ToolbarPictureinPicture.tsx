import React from 'react'
import styled from 'styled-components'

interface IPictureinPicture {
    onClick: () => void
}

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

function PictureinPicture({ onClick }: IPictureinPicture): JSX.Element {
    React.useEffect(() => {
        console.log('PictureinPicture -- render')
        return () => {
            console.log('PictureinPicture -- un mount')
        }
    }, [])

    return (
        <button onClick={onClick}>
            <Icon className="material-icons">picture_in_picture_alt</Icon>
        </button>
    )
}

PictureinPicture.defaultProps = {
    onClick: () => {},
}

export default PictureinPicture
