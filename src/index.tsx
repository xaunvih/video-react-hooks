import React from 'react'
import ReactDOM from 'react-dom'
import Player from './components/Player'
import Provider from './context/Context'

function App(): React.ReactElement {
    return (
        <Provider>
            <Player />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
