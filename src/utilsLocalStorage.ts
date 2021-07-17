interface IValue {
    value: any
}

const LocalStorage = {
    KEYS: {
        VOLUME: 'vd-volume',
        VOLUME_MUTE: 'vd-volume-mute',
    },

    add(key: string, value: any): void {
        localStorage.setItem(
            key,
            JSON.stringify({
                value,
            }),
        )
    },

    get(key: string): IValue {
        const item: string | null = localStorage.getItem(key)
        if (!item) {
            return {
                value: null,
            }
        }

        return JSON.parse(item)
    },

    remove(key: string): void {
        localStorage.removeItem(key)
    },

    clear(): void {
        localStorage.clear()
    },
}

export { LocalStorage }
