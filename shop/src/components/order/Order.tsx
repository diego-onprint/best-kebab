import { Dispatch, SetStateAction, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import type { CartProduct, CartTotal } from "../../types"
import { removeProduct } from "../../store/cart/cartSlice"

type PropsTypes = {
    showOrder: boolean,
    setShowOrder: Dispatch<SetStateAction<boolean>>
    setShowCheckout: Dispatch<SetStateAction<boolean>>
    table: string
}

const Order = memo(({ showOrder, setShowOrder, setShowCheckout, table }: PropsTypes) => {

    const cartProducts = useSelector<RootState, CartProduct[]>(state => state.cart.products)
    const totalProducts = useSelector<RootState, number>(state => state.cart.totalProducts)
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={`${showOrder && "-translate-x-full"} transition-transform z-30 flex flex-col bg-white fixed top-0 -right-[100vw] w-[100vw] h-[80vh] h-`}>
            <div className="relative p-3 shadow-lg">
                <h3 className="text-center font-semibold">Your order</h3>
                <p className="text-center text-zinc-400">Table {table}</p>
                <button onClick={() => setShowOrder(false)} className="absolute left-2 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 bg-neutral-100 top-4 px-4 overflow-y-auto">
                <div className="flex flex-col gap-2 my-2">
                    {
                        cartProducts.length > 0 ?
                            cartProducts.map(product => {
                                return (
                                    <article key={product.localId} className="flex gap-3 rounded-md p-2 bg-white">
                                        <img src={product.images[0].src} alt="" className="w-16 aspect-square object-cover rounded-md" />
                                        <div className="flex-1">
                                            <h3>{product.name}</h3>
                                            <p className="text-zinc-400">(options)</p>
                                            <p className="font-semibold">CHF. {product.price}</p>
                                        </div>
                                        <div className="flex flex-col gap-y-3">
                                            <div className="w-8 h-8 flex items-center justify-center border border-zinc-200 rounded-md">{product.qty}</div>
                                            <button onClick={() => dispatch(removeProduct(product.id))} className="cursor-pointer flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </article>
                                )
                            }) : null
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full p-5 bg-white border-t border-slate-100 shadow-lg">
                <div className="flex flex-col gap-2">
                    <p><span>{totalProducts}</span> producto{totalProducts > 1 && <span>s</span>}</p>
                    <div className="flex justify-between">
                        <p className="">Total</p>
                        <p className="text-xl font-semibold">CHF. {total}</p>
                    </div>
                </div>
                <button onClick={() => setShowCheckout(true)} className="primary-button flex-1">Checkout</button>
            </div>
        </div>
    )
})

export default Order