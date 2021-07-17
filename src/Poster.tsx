import React from 'react'
import styled from 'styled-components'

const PosterWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    img {
        width: 100%;
        height: 100%;
    }
`

interface IPoster {
    thumb?: string
}

const DEFAULT_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg'

function Poster(props: IPoster): JSX.Element {
    const { thumb = DEFAULT_POSTER } = props
    return (
        <PosterWrapper>
            <img src={thumb} />
        </PosterWrapper>
    )
}

export default Poster