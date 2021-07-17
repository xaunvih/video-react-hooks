import React from 'react'

function useTimeout(callback: React.EffectCallback, delay: number | null): React.MutableRefObject<number | null> {
    const timeoutRef = React.useRef<number | null>(null)

    React.useEffect(() => {
        timeoutRef.current = window.setTimeout(() => callback(), Number(delay))
        return () => {
            window.clearTimeout(timeoutRef.current || 0)
        }
    }, [delay, callback])

    return timeoutRef
}

export { useTimeout }
