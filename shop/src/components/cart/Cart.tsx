import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useUpdateOrderDataMutation } from "../../store/api/apiSlice"
import Spinner from "../common/spinner/Spinner"
import { createTimestamp } from "../../utils/createTimestamp"
import { getCurrentDateTime } from "../../utils/getCurrentDateTime"
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/localStorage"
import { clearCart } from "../../store/cart/cartSlice"
import useNavigation from "../../hooks/useNavigation"
import useParam from "../../hooks/useParam"

const TTE = 4 * 60 * 60 * 1000 // 4 hours to expire

const Cart = () => {

    const dispatch = useDispatch<AppDispatch>()
    const checkout = useParam("checkout")
    const cartParam = useParam("cart")
    const cart = useSelector<RootState, Cart>(state => state.cart)
    const [updateOrderData, { isLoading }] = useUpdateOrderDataMutation()

    const { toCheckoutView, toConfirmationView } = useNavigation()

    const updateLocalOrders = (newOrder) => {

        const localOrders = getLocalStorageItem("orders")
        const now = new Date()

        if (localOrders) {
            return setLocalStorageItem("orders", { orders: [...localOrders.orders, newOrder], expiry: now.getTime() + TTE })
        }

        return setLocalStorageItem("orders", { orders: [newOrder], expiry: now.getTime() + TTE })
    }

    const setConfirmationView = (bool: boolean) => toConfirmationView(bool)

    const handleClick = () => toCheckoutView()

    // Place order on DB
    const handleConfirm = async () => {
        const parsedCart = {
            id: cart.tableId,
            data: {
                cart: {
                    total: cart.total,
                    products: cart.products,
                },
                fromShop: true,
            }
        }

        const { data } = await updateOrderData(parsedCart)

        // Set order on local storage with expiration
        if (!data.error) {
            const uid = `${createTimestamp()}-${cart.tableId}`
            const date = getCurrentDateTime()

            const placedOrder = {
                uid,
                date,
                products: cart.products,
                total: cart.total,
            }

            updateLocalOrders(placedOrder)
        }

        setConfirmationView(!data.error)

        dispatch(clearCart())
    }

    const getButtonContent = () => {
        if (isLoading) return <Spinner />
        if (checkout) return "Confirm"
        return "Check Order"
    }

    return (
        <div className={`${!cartParam ? "translate-y-full" : ""} fixed bottom-0 h-20 bg-white w-full z-50 p-4 grid grid-cols-12 gap-2 transition-transform`}>
            <div className="col-span-5">
                <p className="text-sm">{cart.totalProducts} producto{cart.totalProducts !== 1 ? "s" : ""}</p>
                <p className="text-xl font-bold">CHF. {cart.total}</p>
            </div>
            <button
                onClick={!checkout ? handleClick : handleConfirm}
                className="primary-button col-span-7"
                disabled={cart.totalProducts === 0}
            >
                {getButtonContent()}
            </button>
        </div>
    )
}

export default Cart