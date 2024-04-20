import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeProduct, clearCart } from "../../store/cart/cartSlice"
import View from './View'
import { clearTableCart, removeTableProduct, setActiveTable } from "../../store/tables/tablesSlice"
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import type { RootState } from "../../store/store"
import type { AppDispatch } from "../../store/store"
import type { CartProduct, CartTotal, Table } from "../../types"
import { useTicketContext } from "../../context/TicketContext"

const Controller = () => {

    const dispatch = useDispatch<AppDispatch>()
    const cartProducts = useSelector<RootState, CartProduct[]>(state => state.cart.products)
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)
    const kitchenTicket = useSelector<RootState, []>(state => state.kitchenTicket)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const currentLocalOrder = useSelector<RootState, {orderNumber: number}>(state => state.localOrder)
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })
    const getCurrentProducts = () => {
        if (currentTable) return currentTable.cart.products

        return cartProducts
    }
    const products = getCurrentProducts()
    const hasSelectedItemsToPrint = kitchenTicket.length > 0
    // TODO use reducer
    const [disabled, setDisabled] = useState(products.length === 0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [openCheckout, setOpenCheckout] = useState(false)
    const { ticketDomRef, kitchenTicketDomRef } = useTicketContext()

    const getCartTitle = () => {

        if(currentTable) return currentTable.name

        // if (currentTakeaway) return `Abholung/Lieferung #${currentTakeaway.id}`

        return `New Takeaway Order #${currentLocalOrder.orderNumber}`
    }

    // Disable action buttons if cart is empty
    useEffect(() => products.length === 0 ? setDisabled(true) : setDisabled(false), [products])

    const handleClearCart = () => {

        if (currentTable) return dispatch(clearTableCart())

        return dispatch(clearCart())

    }

    const handleDelete = (id: CartProduct["uid"]) => {

        if (currentTable) {

            dispatch(removeTableProduct(id))

        } else {

            dispatch(removeProduct(id))
        }
    }

    const clearTable = () => {
        dispatch(setActiveTable(-1))
    }

    return (
        <ErrorBoundary fallback={<ErrorFallback>Cart Error</ErrorFallback>}>
            <View
                products={products}
                total={total}
                disabled={disabled}
                loading={loading}
                openCheckout={openCheckout}
                setOpenCheckout={setOpenCheckout}
                handleDelete={handleDelete}
                handleClearCart={handleClearCart}
                clearTable={clearTable}
                currentTable={currentTable}
                hasSelectedItemsToPrint={hasSelectedItemsToPrint}
                ticketDomRef={ticketDomRef}
                kitchenTicketDomRef={kitchenTicketDomRef}
                getCartTitle={getCartTitle}
            />
        </ErrorBoundary>
    )
}

export default Controller