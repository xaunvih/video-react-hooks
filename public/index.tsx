import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'video-react-hooks/components/Player'
import PlayerWrapper from 'video-react-hooks/components/PlayerWrapper'

function App(): React.ReactElement {
    return (
        <PlayerWrapper>
            <Player />
        </PlayerWrapper>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
