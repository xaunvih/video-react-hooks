import React from 'react'
import Provider from '../context/Context'

function PlayerWrapper({ children }): React.ReactElement {
    return <Provider>{children}</Provider>
}

export default PlayerWrapper
