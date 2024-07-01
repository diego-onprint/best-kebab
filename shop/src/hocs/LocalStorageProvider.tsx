import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { getLocalStorageItem } from "../utils/localStorage"
import { updateCartInitialState } from "../store/cart/cartSlice"

const TTL = 60 * 60 * 1000

const LocalStorageProvider = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const localStorageCart = getLocalStorageItem("cart")
        localStorageCart && dispatch(updateCartInitialState(localStorageCart))

        const checkExpiry = () => {

            const localStorageOrders = getLocalStorageItem("orders")
    
            if (localStorageOrders) {
    
                    const now = new Date()
    
                    if(now.getTime() > localStorageOrders.expiry) {
                        localStorage.removeItem("orders")
                    }
            }
        }

        checkExpiry()

        // Check for expiration every 1 hour or so
        const intervalId = setInterval(checkExpiry, TTL);

        return () => clearInterval(intervalId);

    }, [dispatch])

    return <>{children}</>
}

export default LocalStorageProvider