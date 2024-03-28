import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeProduct, clearCart } from "../../store/cart/cartSlice"
import type { RootState } from "../../store/store"
import type { AppDispatch } from "../../store/store"
import type { CartProduct, CartProductId, CartTotal } from "../../types"
import Spinner from "../spinner/Spinner"

const Cart = () => {

    const cartProducts = useSelector<RootState, CartProduct[]>(state => state.cart.products)
    const dispatch = useDispatch<AppDispatch>()
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)

    // TODO maybe use reducer
    const [disabled, setDisabled] = useState(cartProducts.length === 0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => cartProducts.length === 0 ? setDisabled(true) : setDisabled(false), [cartProducts])

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleDelete = (id: CartProductId) => {
        console.table([cartProducts, id])
        dispatch(removeProduct(id))
    }

    const handleCheckout = async () => {

        setLoading(true)
        setDisabled(true)

        try {

            const orderData = {
                products: cartProducts,
                isStore: true,
            }

            const response = await axios.post("/api/new-order", orderData)

            console.log("RESPONSE.....", response)

            setSuccess(true)

            dispatch(clearCart())

        } catch (err) {
            //setError
            console.log(err)
        } finally {
            // setLoading(false)
            // setDisabled(false)
            setTimeout(() => success && setSuccess(false), 5000)

            setTimeout(() => {
                setLoading(false)
                setDisabled(false)
            }, 3000)
        }
    }


    return (
        <div className="bg-white flex flex-col basis-[350px] max-w-[450px] pt-8">
            <dl className="divide-y flex flex-col flex-1 overflow-auto px-4">
                {
                    cartProducts.map(product => (
                        <li key={product.id} className="flex py-4 justify-between">
                            <div className="flex gap-2">
                                <p className="font-semibold">{product.qty}</p>
                                <dt className="truncate max-w-60">{product.name}</dt>
                            </div>
                            <div className="flex gap-10">
                                <dd className="font-semibold">${product.price}</dd>
                                <button onClick={() => handleDelete(product.id)} className="text-red-400 cursor-pointer" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))
                }
            </dl>
            <dl className="divide-y border-t">
                <div className="flex justify-between p-4">
                    <dt>Subtotal</dt>
                    <dl>CHF. {total}</dl>
                </div>
                <div className="flex justify-between p-4">
                    <dt className="text-xl font-semibold">Total</dt>
                    <dl className="text-xl font-bold">CHF. {total}</dl>
                </div>
            </dl>
            <div className="grid grid-cols-12 gap-2 p-4">
                <button
                    onClick={handleClearCart}
                    className="ghost-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                    disabled={disabled}
                >
                    Clear
                </button>
                <button
                    onClick={handleCheckout}
                    className={`primary-button col-span-8 disabled:opacity-50 disabled:hover:bg-green-500`}
                    disabled={disabled}
                >
                    {loading ? <Spinner /> : "Checkout"}
                </button>
            </div>
        </div>
    )
}

export default Cart