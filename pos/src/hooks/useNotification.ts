import { useState } from "react"

export const useNotification = () => {

    const [notification, setNotification] = useState(null)

    const showNotification = (message, amount) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, amount)
    }

    return { notification, showNotification }
}