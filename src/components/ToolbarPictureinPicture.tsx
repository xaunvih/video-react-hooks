import React from 'react'
import Icon from './Icon'

interface IProps {
    onClick: () => void
}

function PictureinPicture({ onClick }: IProps): React.ReactElement {
    return (
        <button onClick={onClick}>
            <Icon name="picture_in_picture_alt" />
        </button>
    )
}

export default PictureinPicture
