import React from 'react'
import styled from 'styled-components'
import { useVideoContext } from '../context/Context'

const S = {} as any
S.Wrapper = styled.div``

interface IProps {}

function ToolbarSeekProgress(props: IProps): React.ReactElement {
    const {} = useVideoContext()
    return <S.Wrapper></S.Wrapper>
}

export default ToolbarSeekProgress
