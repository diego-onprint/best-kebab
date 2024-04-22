import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import View from './View'
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import KitchenTicket from "../ticket/KitchenTicket"
import Ticket from "../ticket/Ticket"
import { clearOrderCart, removeOrderProduct, setCurrentOrder } from "../../store/orders/ordersSlice"
import type { RootState } from "../../store/store"
import type { AppDispatch } from "../../store/store"
import type { CartProduct, Order } from "../../types"

const Controller = () => {

    const dispatch = useDispatch<AppDispatch>()
    const kitchenTicket = useSelector<RootState, []>(state => state.kitchenTicket)
    const ordersSlice = useSelector<RootState, Order[]>(state => state.orders)
    const order = ordersSlice.orders.find(ord => ord.id === ordersSlice.currentOrder)
    const hasSelectedItemsToPrint = kitchenTicket.length > 0
    const disabled = order.cart.products.length === 0
    const [loading, setLoading] = useState(false)

    console.log("Current Order", order)

    const getCartTitle = () => {

        if (order?.isTable) return order.name

        if (order.isNewOrder) return `New Takeaway Order #${ordersSlice.orderNumber}`

        return `Abholung/Lieferung #${order.id}`
    }

    const handleClearCart = () => dispatch(clearOrderCart(order.id))

    const handleDelete = (id: CartProduct["uid"]) => dispatch(removeOrderProduct(id))

    const clearCurrentOrder = () => dispatch(setCurrentOrder(-1))

    return (
        <ErrorBoundary fallback={<ErrorFallback>Cart Error</ErrorFallback>}>
            <View
                order={order}
                disabled={disabled}
                loading={loading}
                handleDelete={handleDelete}
                handleClearCart={handleClearCart}
                clearCurrentOrder={clearCurrentOrder}
                hasSelectedItemsToPrint={hasSelectedItemsToPrint}
                getCartTitle={getCartTitle}
            />
            <Ticket />
            <KitchenTicket />
        </ErrorBoundary>
    )
}

export default Controller