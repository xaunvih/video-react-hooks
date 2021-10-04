import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../styles'

interface IStyledBulletProps {
    move: number
}

const SliderInner = styled.div`
    position: relative;
    height: 3px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.2);
`

const ProgessCommon = styled.div`
    height: 100%;
    width: 0;
    background-color: rgb(96, 157, 255);
    position: absolute;
    left: 0;
    top: 0;
`

const Progess = styled(ProgessCommon)<IStyledBulletProps>`
    ${(props) =>
        props.move &&
        css`
            width: ${props.move}px;
        `};
`

const Desized = styled(Progess)`
    background-color: rgba(255, 255, 255, 0.4);
`

const SliderWrapper = styled.div`
    cursor: pointer;
    height: 20px;

    &:hover {
        ${SliderInner} {
            height: 5px;
        }
    }
`

const BulletCommon = styled.span`
    height: 13px;
    width: 13px;
    background-color: ${colors.white};
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    margin-left: -6px;
`

// This way is similar with traditional inline styles
// const Bullet = styled(BulletCommon).attrs<IStyledBulletProps>((props) => ({
//     style: {
//         left: props.move ? `${props.move}px` : 0,
//     },
// }))

const Bullet = styled(BulletCommon)<IStyledBulletProps>`
    ${(props) =>
        props.move &&
        css`
            left: ${props.move}px;
        `};
`

const S = { SliderWrapper, SliderInner, Bullet, Progess, Desized }

interface IProps {
    value: number
    min: number
    max: number
    autoHideBullets?: boolean
    onChange?: (value: number) => void
    onChangetart?: () => void
    onChangeEnd?: () => void
}

function getClient(evt: React.MouseEvent | React.TouchEvent) {
    const isTouchEvent = Boolean((evt as React.TouchEvent).targetTouches)
    const { clientX, clientY } = isTouchEvent ? (evt as React.TouchEvent).targetTouches[0] : (evt as React.MouseEvent)
    return {
        isTouchEvent,
        clientX,
        clientY,
    }
}

function Slider(props: IProps): React.ReactElement {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        left: 0,
    })

    const [move, updateMove] = useState(0)
    const [skeleton] = useState({
        startPosition: 0,
        dragPosition: 0,
        dragOffset: 0,
        isDragging: false,
    })

    const updateDimensions = useCallback((element) => {
        if (!element) return

        const clientRect = element.getBoundingClientRect()
        setDimensions({
            width: element.offsetWidth,
            height: element.offsetHeight,
            left: clientRect.left,
        })
    }, [])

    function onClick(evt: React.MouseEvent) {
        const { dragOffset } = skeleton
        const clickThreshol = 5

        if (Math.abs(dragOffset) < clickThreshol) {
            const { clientX } = getClient(evt)
            setDragPosition(clientX)
        }

        skeleton.dragOffset = 0
    }

    function onDragStart(evt: React.MouseEvent | React.TouchEvent) {
        const { clientX } = getClient(evt)
        skeleton.isDragging = true
        skeleton.startPosition = clientX

        if (props.onChangetart) {
            props.onChangetart()
        }
    }

    function onDraging(evt: React.MouseEvent | React.TouchEvent) {
        if (!skeleton.isDragging) return

        const { clientX } = getClient(evt)
        setDragPosition(clientX)
    }

    function onDragEnd() {
        skeleton.isDragging = false

        if (props.onChangeEnd) {
            props.onChangeEnd()
        }
    }

    function setDragPosition(endPosition: number) {
        const { width: sliderWidth, left } = dimensions
        const { startPosition } = skeleton

        skeleton.dragOffset = endPosition - startPosition
        skeleton.dragPosition = endPosition - left

        const { dragPosition } = skeleton
        if (dragPosition >= 0 && dragPosition <= sliderWidth) {
            updateMove(skeleton.dragPosition)

            if (props.onChange) {
                const current = (dragPosition / sliderWidth) * (props.max - props.min)
                props.onChange(current)
            }
        }
    }

    useEffect(() => {
        if (skeleton.isDragging) return

        const move = (props.value / (props.max - props.min)) * dimensions.width
        skeleton.dragPosition = move + dimensions.left
        updateMove(move)
    }, [props.min, props.max, props.value, dimensions.left, dimensions.width, skeleton, skeleton.isDragging, skeleton.dragPosition])

    return (
        <S.SliderWrapper onClick={onClick} onMouseMove={onDraging} onMouseUp={onDragEnd} onTouchMove={onDraging} onTouchEnd={onDragEnd}>
            <S.SliderInner ref={updateDimensions}>
                <S.Progess move={move} />
                <S.Bullet move={move} onMouseDown={onDragStart} onTouchStart={onDragStart} />
            </S.SliderInner>
        </S.SliderWrapper>
    )
}

Slider.defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    autoHideBullets: false,
}

export default React.memo(Slider)
