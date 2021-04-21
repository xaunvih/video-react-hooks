import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

function Volume(): JSX.Element {
    return (
        <button>
            <Icon className="material-icons">volume_up</Icon>
        </button>
    )
}

export default Volume

// volume_off volume_mute volume_down volume_up
