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

const Controller = () => {

    const dispatch = useDispatch<AppDispatch>()
    const cartProducts = useSelector<RootState, CartProduct[]>(state => state.cart.products)
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })

    const products = currentTable ? currentTable.cart.products : cartProducts

    const [openCheckout, setOpenCheckout] = useState(false)

    // TODO use reducer
    const [disabled, setDisabled] = useState(products.length === 0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => products.length === 0 ? setDisabled(true) : setDisabled(false), [products])

    const handleClearCart = () => {

        if (currentTable) {

            dispatch(clearTableCart())

        } else {

            dispatch(clearCart())
        }

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
            />
        </ErrorBoundary>
    )
}

export default Controller