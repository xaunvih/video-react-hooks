import React from 'react'
import styled from 'styled-components'
import { useVideoStateContext } from '../context/Context'
import { colors } from '../styles'

const S = {
    PosterWrapper: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${colors.black};
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    `,
}

interface IProps {
    thumb?: string
}

const DEFAULT_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg'

function Poster(props: IProps): React.ReactElement {
    const { thumb = DEFAULT_POSTER } = props
    const { state } = useVideoStateContext()
    const { hasStarted } = state

    return (
        <S.PosterWrapper hidden={hasStarted}>
            <img src={thumb} />
        </S.PosterWrapper>
    )
}

export default Poster
