import React from 'react'
import ReactDOM from 'react-dom'
import Player from './Player'
import Provider from './Context'

function App(): JSX.Element {
    return (
        <Provider>
            <Player />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
