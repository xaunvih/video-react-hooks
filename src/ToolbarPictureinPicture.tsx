import React from 'react'
import Icon from './Icon'

interface IPictureinPicture {
    onClick: () => void
}

function PictureinPicture({ onClick }: IPictureinPicture): JSX.Element {
    return (
        <button onClick={onClick}>
            <Icon name="picture_in_picture_alt" />
        </button>
    )
}

export default PictureinPicture
