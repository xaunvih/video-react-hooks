import React from 'react'
import styled from 'styled-components'
import { standartSpacingPoint, colors } from '../styles'
import CircleInnerCircleIcon from '../icons/circle-inner-circle.svg'
import CicleOutlineIcon from '../icons/circle-outline.svg'
import CircleIcon from '../icons/circle.svg'
import CloseIcon from '../icons/close.svg'
import CloseCaptionIcon from '../icons/closed-caption.svg'
import FastForwardIcon from '../icons/fast-forward.svg'
import FastRewindIcon from '../icons/fast-rewind.svg'
import Forward5Icon from '../icons/forward-5.svg'
import Forward10Icon from '../icons/forward-10.svg'
import Forward30Icon from '../icons/forward-30.svg'
import FullscreenExitIcon from '../icons/fullscreen-exit.svg'
import FullscreenIcon from '../icons/fullscreen.svg'
import HDIcon from '../icons/hd.svg'
import InfoOutlineIcon from '../icons/info-outline.svg'
import InfoIcon from '../icons/info.svg'
import PauseCircleFilledIcon from '../icons/pause-circle-filled.svg'
import PauseCircleOutline from '../icons/pause-circle-outline.svg'
import PauseIcon from '../icons/pause.svg'
import PlayArrowIcon from '../icons/play-arrow.svg'
import PlayCicleFilledIcon from '../icons/play-circle-filled.svg'
import PlayCircleOutlineIcon from '../icons/play-circle-outline.svg'
import SettingIcon from '../icons/settings.svg'
import ShareIcon from '../icons/share.svg'
import SkipNextIcon from '../icons/skip-next.svg'
import SkipPreviousIcon from '../icons/skip-previous.svg'
import StopIcon from '../icons/stop.svg'
import RePlay5Icon from '../icons/replay-5.svg'
import RePlay10Icon from '../icons/replay-10.svg'
import RePlay30Icon from '../icons/replay-30.svg'
import VolumeDownIcon from '../icons/volume-down.svg'
import VolumeMuteIcon from '../icons/volume-mute.svg'
import VolumeOffIcon from '../icons/volume-off.svg'
import VolumeUpIcon from '../icons/volume-up.svg'

interface IProps {
    name: string
}

const S = {
    Icon: styled.span`
        color: ${colors.white};
        padding: ${standartSpacingPoint}px;
    `,
}

function Icon(props: IProps): React.ReactElement {
    return <S.Icon className="material-icons">{props.name}</S.Icon>
}

export {
    Icon as default,
    VolumeDownIcon,
    VolumeMuteIcon,
    VolumeOffIcon,
    VolumeUpIcon,
    RePlay5Icon,
    RePlay10Icon,
    RePlay30Icon,
    PlayArrowIcon,
    PlayCicleFilledIcon,
    PlayCircleOutlineIcon,
    SettingIcon,
    ShareIcon,
    SkipNextIcon,
    SkipPreviousIcon,
    StopIcon,
    PauseCircleFilledIcon,
    PauseCircleOutline,
    PauseIcon,
    CircleInnerCircleIcon,
    CicleOutlineIcon,
    CircleIcon,
    CloseIcon,
    CloseCaptionIcon,
    FastForwardIcon,
    FastRewindIcon,
    Forward5Icon,
    Forward10Icon,
    Forward30Icon,
    FullscreenExitIcon,
    FullscreenIcon,
    HDIcon,
    InfoOutlineIcon,
    InfoIcon,
}
