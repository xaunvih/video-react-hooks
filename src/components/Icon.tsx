import React from 'react'
import styled from 'styled-components'
import { standartSpacingPoint, colors } from '../styles'

interface IProps {
    name: string
}

const S = {
    Icon: styled.span`
        color: ${colors.white};
        padding: ${standartSpacingPoint}px;
    `,
}

function Icon(props: IProps): React.ReactElement {
    return <S.Icon className="material-icons">{props.name}</S.Icon>
}

export default Icon
