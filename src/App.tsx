import React from 'react'
import styled, { css } from 'styled-components'

interface IButtonProps {
    primary: boolean
}

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;

    ${(props: IButtonProps) =>
        props.primary &&
        css`
            background: palevioletred;
            color: white;
        `};
`

function App(): JSX.Element {
    return (
        <div>
            <Button primary={false}>Not Primary</Button>
            <Button primary={true}>Primary</Button>
            <h3>Hello Dude!</h3>
        </div>
    )
}

export default App
