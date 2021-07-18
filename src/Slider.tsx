import React, { useState } from 'react'
import styled, { css } from 'styled-components'

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

const Progess = styled(ProgessCommon)<IMoveStyle>`
    ${(props) =>
        props.move &&
        css`
            width: ${props.move}px;
        `};
`

const Desized = styled(Progess)`
    background-color: rgba(255, 255, 255, 0.4);
`

const BulletCommon = styled.span`
    height: 13px;
    width: 13px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
`

const Bullet = styled(BulletCommon)<IMoveStyle>`
    ${(props) =>
        props.move &&
        css`
            left: ${props.move}px;
        `};
`

// This way is similar with traditional inline styles
// const BulletOther = styled(BulletCommon).attrs<IMoveStyle>((props) => ({
//     style: {
//         left: props.move ? `${props.move}px` : 0,
//     },
// }))

const SliderWrapper = styled.div`
    height: 20px;
    cursor: pointer;

    &:hover {
        ${SliderInner} {
            height: 5px;
        }
    }
`

interface IMoveStyle {
    move: number
}

interface ISlider {
    value?: number
    min?: number
    max?: number
    autoHideBullets?: boolean
    step?: number
    onChange?: (value: number) => void
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

function Slider(props: ISlider) {
    const [move, updateMove] = useState(0)
    const [state] = useState({
        startPosition: 0,
        previousPosition: 0,
        dragPosition: 0,
        dragOffset: 0,
        isDragging: false,
    })

    function onClick(evt: React.MouseEvent) {
        const { dragOffset } = state
        const clickThreshol = 5

        if (Math.abs(dragOffset) > clickThreshol) {
            evt.preventDefault()
            evt.stopPropagation()
        }
    }

    function onDragStart(evt: React.MouseEvent | React.TouchEvent) {
        const { clientX, isTouchEvent } = getClient(evt)

        if (!isTouchEvent) {
            evt.preventDefault()
            evt.stopPropagation()
        }

        state.isDragging = true
        state.startPosition = clientX
        state.previousPosition = state.dragPosition
        setDragPosition(state.startPosition)
    }

    function onDraging(evt: React.MouseEvent | React.TouchEvent) {
        if (!state.isDragging) return

        const { clientX } = getClient(evt)
        setDragPosition(clientX)
    }

    function onDragEnd() {
        state.isDragging = false
    }

    function setDragPosition(x: number) {
        const { startPosition, previousPosition, dragOffset } = state
        state.dragOffset = x - startPosition
        state.dragPosition = previousPosition + dragOffset

        updateMove(state.dragPosition)
        if (props.onChange) {
            props.onChange(state.dragPosition)
        }
    }

    return (
        <SliderWrapper
            onClick={onClick}
            onMouseMove={onDraging}
            onMouseUp={onDragEnd}
            onTouchMove={onDraging}
            onTouchEnd={onDragEnd}
        >
            <SliderInner>
                <Desized move={move} />
                <Progess move={move} />
                <Bullet move={move} onMouseDown={onDragStart} onTouchStart={onDragStart} />
            </SliderInner>
        </SliderWrapper>
    )
}

Slider.defaultProps = {
    min: 0,
    max: 100,
    autoHideBullets: true,
}

export default Slider
