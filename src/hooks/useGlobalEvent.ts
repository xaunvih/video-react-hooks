import { useRef, useEffect } from 'react'

const defaultOptions = {
    capture: false,
    once: false,
    passive: false,
}

const useGlobalEvent = (
    eventName: string,
    handler: (...args: any) => void,
    element: Document = document,
    options: any = { ...defaultOptions },
) => {
    const { capture, passive, once } = options
    const savedHandler = useRef(handler)

    useEffect(() => {
        savedHandler.current = handler
    })

    useEffect(() => {
        const opts = { capture, passive, once }
        const isSupported = typeof element !== 'undefined' && element.addEventListener
        if (!isSupported) {
            return
        }

        element.addEventListener(eventName, savedHandler.current, opts)
        return () => {
            element.removeEventListener(eventName, savedHandler.current, opts)
        }
    }, [eventName, element, capture, passive, once])
}

export { useGlobalEvent }
