import React from 'react'
import styled from 'styled-components'
import { standartSpacingPoint, colors } from './styles'

interface IIconProps {
    name: string
}

const StyledIcon = styled.span`
    color: ${colors.white};
    padding: ${standartSpacingPoint}px;
`

function Icon(props: IIconProps): JSX.Element {
    return <StyledIcon className="material-icons">{props.name}</StyledIcon>
}

export default Icon
