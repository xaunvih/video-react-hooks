import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from './Context'

const Wrapper = styled.div``

interface IToolbarSeekProgress {}

function ToolbarSeekProgress(props: IToolbarSeekProgress): JSX.Element {
    const {} = useVideoContext()
    return <Wrapper></Wrapper>
}

export default ToolbarSeekProgress
