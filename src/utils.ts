export function formatTime(seconds = 0, guide = seconds) {
    let s: any = Math.floor(seconds % 60)
    let m: any = Math.floor((seconds / 60) % 60)
    let h: any = Math.floor(seconds / 3600)

    const gm = Math.floor((guide / 60) % 60)
    const gh = Math.floor(guide / 3600)

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
        // '-' is false for all relational operators (e.g. <, >=) so this setting
        // will add the minimum number of fields specified by the guide
        h = '-'
        m = '-'
        s = '-'
    }

    // Check if we need to show hours
    h = h > 0 || gh > 0 ? `${h}:` : ''
    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`
    // Check if leading zero is need for seconds
    s = s < 10 ? `0${s}` : s

    return h + m + s
}

export function debounce(func: Function, delay = 300) {
    let debounceTimer: ReturnType<typeof setTimeout>

    return function () {
        const context = this
        const args = arguments

        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}

export function throttle(func: Function, limit = 16) {
    let waiting: boolean = false
    return function () {
        const args = arguments
        const context = this
        if (!waiting) {
            waiting = true
            setTimeout(() => {
                func.apply(context, args)
                waiting = false
            }, limit)
        }
    }
}
