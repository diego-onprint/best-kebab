import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import View from './View'
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import { clearOrderCart, removeOrderProduct, setCurrentOrder } from "../../store/orders/ordersSlice"
import type { RootState } from "../../store/store"
import type { AppDispatch } from "../../store/store"
import type { CartProduct } from "../../types"
import { useActiveOrder, useOrderNumber } from "../../hooks/useActiveOrder"
import { useNavigate } from "react-router-dom"

const Controller = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const kitchenTicket = useSelector<RootState, []>(state => state.kitchenTicket)
    const order = useActiveOrder()
    const orderNumber = useOrderNumber()
    const hasSelectedItemsToPrint = kitchenTicket.length > 0
    const disabled = order.cart.products.length === 0
    const [loading, setLoading] = useState(false)

    console.log("Cart Current Order", order)

    const getCartTitle = () => {

        if (order?.isTable) return order.name

        if (order.isNewOrder) return `New Takeaway Order #${orderNumber}`

        return `Abholung/Lieferung #${order.id}`
    }

    const handleClearCart = () => dispatch(clearOrderCart(order.id))

    const handleDelete = (e, id: CartProduct["uid"]) => {
        e.stopPropagation()
        dispatch(removeOrderProduct(id))
    }

    const clearCurrentOrder = () => {
        dispatch(setCurrentOrder(-1))
        navigate("/categories")
    }

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
        </ErrorBoundary>
    )
}

export default Controller