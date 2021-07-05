import React from 'react'
import styled from 'styled-components'
import LocalStorage from './utilsLocalStorage'

const Icon = styled.span`
    color: #fff;
    padding: 10px 15px;
`

type Icon = 'volume_off' | 'volume_mute' | 'volume_down' | 'volume_up'

interface IVolumeProps {
    volume: number
    updateVolume: any
}

const Slider = styled.div`
    height: 3px;
`

const Bullet = styled.span`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #fff;
`

function Volume({ volume, updateVolume }: IVolumeProps): JSX.Element {
    const [icon, setIcon] = React.useState<Icon>(() => classifyIcon(volume))

    React.useEffect(() => {
        setIcon(classifyIcon(Number(volume)))
    }, [volume])

    function classifyIcon(volume: number): Icon {
        if (volume === 0) return 'volume_off'
        if (volume <= 0.33) return 'volume_mute'
        if (volume <= 0.66) return 'volume_down'
        return 'volume_up'
    }

    function onClick() {
        console.log('[Volume] --> Click')
        const newVolume = volume === 0 ? 1 : 0

        updateVolume(newVolume)
        LocalStorage.add(LocalStorage.keys.VOLUME, String(newVolume))
    }

    return (
        <div onClick={onClick}>
            <button>
                <Icon className="material-icons">{icon}</Icon>
            </button>
            <Slider>
                <Bullet />
            </Slider>
        </div>
    )
}

export default Volume
