import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LocalStorage } from './utilsLocalStorage'

const Icon = styled.span`
    color: #fff;
    padding: 8px;
`

const ICON = {
    OFF: 'volume_off',
    MUTE: 'volume_mute',
    DOWN: 'volume_down',
    UP: 'volume_up',
}

const VolumeWraper = styled.div`
    width: 150px;
    display: flex;

    input {
        flex-grow: 1;
        height: 2px;
    }
`

function classifyIcon(volume: number): string {
    if (volume === 0) return ICON.OFF
    if (volume <= 0.4) return ICON.MUTE
    if (volume <= 0.7) return ICON.DOWN
    return ICON.UP
}

interface IVolumeProps {
    volume: number
    updateVolume: any
}

const DEFAULT_VOLUME = 0.7
const { VOLUME, VOLUME_MUTE } = LocalStorage.KEYS

function Volume({ volume, updateVolume }: IVolumeProps): JSX.Element {
    const [icon, setIcon] = useState<string>(() => classifyIcon(volume))

    useEffect(() => {
        const { value } = LocalStorage.get(VOLUME)
        const volume = value ? Number(value) : DEFAULT_VOLUME
        updateVolume(volume)
    }, [])

    useEffect(() => {
        setIcon(classifyIcon(volume))
        LocalStorage.add(VOLUME, String(volume))
    }, [volume])

    function onClick() {
        if (volume) {
            LocalStorage.add(VOLUME_MUTE, String(volume))
            updateVolume(0)
            return
        }

        const { value } = LocalStorage.get(VOLUME_MUTE)
        const savedVolume = value ? Number(value) : DEFAULT_VOLUME
        updateVolume(savedVolume)
    }

    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
        updateVolume(Number(evt.target.value) / 100)
    }

    return (
        <VolumeWraper>
            <button onClick={onClick}>
                <Icon className="material-icons">{icon}</Icon>
            </button>
            <input type="range" min={0} max={100} value={volume * 100} onChange={onChange} />
        </VolumeWraper>
    )
}

export default Volume
