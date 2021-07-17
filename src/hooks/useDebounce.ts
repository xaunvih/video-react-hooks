import { useRef, useEffect, useCallback } from 'react'

type CallbackFunction = (...args: any[]) => void

function debounce(fn: CallbackFunction, timer = 300) {
    let timeoutId: number = 0
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => fn.apply(this, args), timer)
    }
}

const useDebouncedFn = (fn: CallbackFunction, wait = 100, dependencies = []) => {
    const debounced = debounce(fn, wait)
    return useCallback(debounced, dependencies)
}

export { useDebouncedFn }
