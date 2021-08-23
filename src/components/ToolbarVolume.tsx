import React, { useCallback, useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import styled from 'styled-components'
import { LocalStorage } from '../utils/localStorage'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useVideoStateContext } from '../context/Context'
import { VOLUME_CHANGE } from '../context/types'
import { ActionTypes } from '../context/@types'
import Icon, { VolumeDownIcon, VolumeMuteIcon, VolumeOffIcon, VolumeUpIcon } from './Icon'
import Slider from './Slider'
import { standartSpacingPoint } from '../styles'

const ICON = {
    OFF: <VolumeOffIcon />,
    MUTE: <VolumeMuteIcon />,
    DOWN: <VolumeDownIcon />,
    UP: <VolumeUpIcon />,
}

const S = {} as any

S.VolumeWraper = styled.div`
    width: ${standartSpacingPoint * 19}px;
    display: flex;
    align-items: center;

    > div {
        flex-grow: 1;
    }
`

function classifyIcon(volume: number): React.ReactElement {
    if (volume === 0) return ICON.OFF
    if (volume <= 0.4) return ICON.MUTE
    if (volume <= 0.7) return ICON.DOWN
    return ICON.UP
}

const DEFAULT_VOLUME = 0.7
const { VOLUME, VOLUME_MUTE } = LocalStorage.KEYS

interface IProps {
    volume: number
    dispatch: React.Dispatch<ActionTypes>
}

const Volume = React.memo((props: IProps) => {
    const [icon, setIcon] = useState(() => classifyIcon(volume))
    const [storedVolume, setStoredVolume] = useLocalStorage(VOLUME, DEFAULT_VOLUME)
    const [storedMuteVolume, setStoredMuteVolume] = useLocalStorage(VOLUME_MUTE, DEFAULT_VOLUME)

    const { volume, dispatch } = props
    const updateVolume = useCallback(
        (volume: number) => {
            dispatch({
                type: VOLUME_CHANGE,
                payload: {
                    volume,
                },
            })
        },
        [dispatch],
    )

    // initial time
    useEffect(() => {
        unstable_batchedUpdates(() => {
            updateVolume(storedVolume)
            setIcon(classifyIcon(storedVolume))
        })
    }, [])

    // onChange
    function onChange(value: number) {
        const volume = value / 100

        updateVolume(volume)
        setStoredVolume(volume)
        setIcon(classifyIcon(volume))
    }

    // Click icon volume
    function onClick() {
        let volumeTemp = storedMuteVolume ? storedMuteVolume : DEFAULT_VOLUME
        if (volume) {
            volumeTemp = 0
            setStoredMuteVolume(volume)
        }

        updateVolume(volumeTemp)
        setIcon(classifyIcon(volumeTemp))
        setStoredVolume(volumeTemp)
    }

    return (
        <S.VolumeWraper>
            <button onClick={onClick}>{icon}</button>
            <Slider min={0} max={100} value={volume * 100} onChange={onChange} />
        </S.VolumeWraper>
    )
})

function VolumeWithContext(): React.ReactElement {
    const { state, dispatch } = useVideoStateContext()
    const { volume } = state

    return <Volume volume={volume} dispatch={dispatch} />
}

export default VolumeWithContext
