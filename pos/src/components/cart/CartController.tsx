import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeProduct, clearCart } from "../../store/cart/cartSlice"
import type { RootState } from "../../store/store"
import type { AppDispatch } from "../../store/store"
import type { CartProduct, CartProductId, CartTotal } from "../../types"
import CartView from './CartView'

const CartController = () => {

    const dispatch = useDispatch<AppDispatch>()
    const cartProducts = useSelector<RootState, CartProduct[]>(state => state.cart.products)
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)

    const [openCheckout, setOpenCheckout] = useState(false)

    // console.log("CART........", cartProducts)

    // TODO use reducer
    const [disabled, setDisabled] = useState(cartProducts.length === 0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => cartProducts.length === 0 ? setDisabled(true) : setDisabled(false), [cartProducts])

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleDelete = (id: CartProductId) => {
        dispatch(removeProduct(id))
    }

    return (
        <CartView 
            products={cartProducts}
            total={total}
            disabled={disabled}
            loading={loading}
            openCheckout={openCheckout}
            setOpenCheckout={setOpenCheckout}
            handleDelete={handleDelete}
            handleClearCart={handleClearCart}
            isTable={activeTable !== -1}
        />
    )
}

export default CartController