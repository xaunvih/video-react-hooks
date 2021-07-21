import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'
import { colors } from './styles'

const PosterWrapper = styled.div`
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
`

interface IPoster {
    thumb?: string
}

const DEFAULT_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg'

function Poster(props: IPoster): JSX.Element {
    const { thumb = DEFAULT_POSTER } = props
    const { state } = useVideoContext()
    const { hasStarted } = state

    return (
        <PosterWrapper hidden={hasStarted}>
            <img src={thumb} />
        </PosterWrapper>
    )
}

export default Poster
