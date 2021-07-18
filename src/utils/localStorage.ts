class LocalStorage {
    static get KEYS() {
        return {
            VOLUME: 'vd-volume',
            VOLUME_MUTE: 'vd-volume-mute',
        }
    }

    static add(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify({ value }))
    }

    static get(key: string) {
        const item: string | null = window.localStorage.getItem(key)
        if (!item) {
            return { value: null }
        }

        return JSON.parse(item)
    }

    static remove(key: string) {
        window.localStorage.removeItem(key)
    }

    static clear() {
        window.localStorage.clear()
    }
}

export { LocalStorage }
