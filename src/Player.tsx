import React from 'react'
import Provider from './Context'

function Player(): JSX.Element {
    return (
        <Provider>
            <h3>Hello Dude!</h3>
        </Provider>
    )
}

export default Player
