import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { LocalStorage } from './utils/localStorage'
import { useVideoContext } from './Context'
import { VOLUME_CHANGE } from './context/types'
import { ActionTypes } from './context/@types'
import Icon from './Icon'
import Slider from './Slider'
import { standartSpacingPoint } from './styles'

const ICON = {
    OFF: 'volume_off',
    MUTE: 'volume_mute',
    DOWN: 'volume_down',
    UP: 'volume_up',
}

const VolumeWraper = styled.div`
    width: ${standartSpacingPoint * 19}px;
    display: flex;
    align-items: center;
`

function classifyIcon(volume: number): string {
    if (volume === 0) return ICON.OFF
    if (volume <= 0.4) return ICON.MUTE
    if (volume <= 0.7) return ICON.DOWN
    return ICON.UP
}

const DEFAULT_VOLUME = 0.7
const { VOLUME, VOLUME_MUTE } = LocalStorage.KEYS

interface IVolumeProps {
    volume: number
    dispatch: React.Dispatch<ActionTypes>
}

const Volume = React.memo((props: IVolumeProps) => {
    const [icon, setIcon] = useState<string>(() => classifyIcon(volume))
    const { volume, dispatch } = props

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
})

function VolumeWrapper(): JSX.Element {
    const { state, dispatch } = useVideoContext()
    const { volume } = state

    return <Volume volume={volume} dispatch={dispatch} />
}

export default VolumeWrapper
