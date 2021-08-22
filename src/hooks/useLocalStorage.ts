import { useEffect, useState, useCallback } from 'react'
import { LocalStorage } from '../utils/localStorage'

function useLocalStorage(key: string, initialValue: any) {
    const readValue = useCallback(() => {
        try {
            const item = LocalStorage.get(key)
            return item.value ? item.value : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return initialValue
        }
    }, [key, initialValue])

    const [storedValue, setStoredValue] = useState(readValue)

    const setValue = (newValue: any) => {
        try {
            LocalStorage.add(key, newValue)
            setStoredValue(newValue)

            window.dispatchEvent(new Event('local-storage'))
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
        }
    }

    useEffect(() => {
        setStoredValue(readValue())
    }, [readValue])

    useEffect(() => {
        const handleStorageChange = () => setStoredValue(readValue())

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('local-storage', handleStorageChange)
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('local-storage', handleStorageChange)
        }
    }, [readValue])

    return [storedValue, setValue]
}

export { useLocalStorage }
