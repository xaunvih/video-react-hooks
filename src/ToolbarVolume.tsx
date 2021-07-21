import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { LocalStorage } from './utils/localStorage'
import { useVideoContext } from './Context'
import { VOLUME_CHANGE } from './context/types'
import Icon from './Icon'
import Slider from './Slider'

const ICON = {
    OFF: 'volume_off',
    MUTE: 'volume_mute',
    DOWN: 'volume_down',
    UP: 'volume_up',
}

const VolumeWraper = styled.div`
    width: 150px;
    display: flex;
    align-items: center;

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

const DEFAULT_VOLUME = 0.7
const { VOLUME, VOLUME_MUTE } = LocalStorage.KEYS

function Volume(): JSX.Element {
    const [icon, setIcon] = useState<string>(() => classifyIcon(volume))
    const { state, dispatch } = useVideoContext()
    const { volume } = state

    const updateVolume = useCallback(
        (volume: number) => {
            dispatch({
                type: VOLUME_CHANGE,
                payload: { volume },
            })
        },
        [dispatch],
    )

    useEffect(() => {
        const { value } = LocalStorage.get(VOLUME)
        const volume = value ? Number(value) : DEFAULT_VOLUME

        updateVolume(volume)
    }, [updateVolume])

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

    function onChange(value: number) {
        updateVolume(value / 100)
    }

    return (
        <VolumeWraper>
            <button onClick={onClick}>
                <Icon name={icon} />
            </button>
            <Slider min={0} max={100} value={volume * 100} onChange={onChange} />
        </VolumeWraper>
    )
}

export default Volume
