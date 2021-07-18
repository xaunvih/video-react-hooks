import { useState, useCallback } from 'react'
import { useGlobalEvent } from './useGlobalEvent'

type EventCallback = (this: Document, event_: any) => any
type OnChangeEventCallback = (this: Document, event_: any, isOpen: boolean) => any
type NoopFunction = () => void

type FullScreenOptions = {
    onChange?: OnChangeEventCallback
    onError?: EventCallback
}

type NormalizedFullscreenApi = {
    requestFullscreen: string
    exitFullscreen: string
    fullscreenElement: string
    fullscreenEnabled: string
    fullscreenchange: string
    fullscreenerror: string
}

type FullscreenApi = {
    isEnabled: boolean
    isFullscreen: boolean
    element: HTMLElement | null | undefined
    exit: NoopFunction | (() => Promise<unknown>)
    request: NoopFunction | ((element?: HTMLElement) => Promise<unknown>)
    toggle: NoopFunction | ((element?: HTMLElement) => Promise<unknown>)
}

const getFullscreenControls = (): NormalizedFullscreenApi => {
    const functionMap = [
        [
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror',
        ],
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror',
        ],
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror',
        ],
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError',
        ],
    ]

    const returnValue = {} as NormalizedFullscreenApi

    functionMap.forEach((functionSet) => {
        if (functionSet && functionSet[1] in document) {
            functionSet.forEach((_function, index) => {
                returnValue[functionMap[0][index]] = functionSet[index]
            })
        }
    })

    return returnValue
}

function useFullscreen(options: FullScreenOptions = {}): FullscreenApi {
    const { onChange: onChangeArgument, onError: onErrorArgument } = options
    const fullscreenControls = getFullscreenControls()
    const [isFullscreen, setIsFullscreen] = useState(Boolean(document[fullscreenControls.fullscreenElement]))
    const [element, setElement] = useState(document[fullscreenControls.fullscreenElement])

    const request = useCallback(
        async (element?: HTMLElement) => {
            try {
                const finalElement = element || document.documentElement
                return await finalElement[fullscreenControls.requestFullscreen]()
            } catch (error) {
                console.log(error)
            }
        },
        [fullscreenControls.requestFullscreen],
    )

    const exit = useCallback(async () => {
        if (element) {
            try {
                return await document[fullscreenControls.exitFullscreen]()
            } catch (error) {
                console.warn(error)
            }
        }
    }, [element, fullscreenControls.exitFullscreen])

    const toggle = useCallback(
        (newElement?: HTMLElement) => {
            if (element) {
                exit()
            }

            request(newElement)
        },
        [element, exit, request],
    )

    useGlobalEvent(fullscreenControls.fullscreenchange, (evt) => {
        const currentFullscreenElement = document[fullscreenControls.fullscreenElement]
        const isOpen = Boolean(currentFullscreenElement)

        setIsFullscreen(isOpen)
        setElement(isOpen ? currentFullscreenElement : null)
        onChangeArgument?.call(document, evt, isOpen)
    })

    useGlobalEvent(fullscreenControls.fullscreenerror, (evt) => {
        onErrorArgument?.call(document, evt)
    })

    return {
        isEnabled: Boolean(document[fullscreenControls.fullscreenEnabled]),
        isFullscreen,
        element,
        exit,
        request,
        toggle,
    }
}

export { useFullscreen }
