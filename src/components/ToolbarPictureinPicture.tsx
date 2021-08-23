import React from 'react'
import { InfoOutlineIcon } from './Icon'

interface IProps {
    onClick: () => void
}

function PictureinPicture({ onClick }: IProps): React.ReactElement {
    return (
        <button onClick={onClick}>
            <InfoOutlineIcon />
        </button>
    )
}

export default PictureinPicture
