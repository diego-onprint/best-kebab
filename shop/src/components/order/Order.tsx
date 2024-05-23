import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { removeProduct } from "../../store/cart/cartSlice"

const Order = () => {

    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector<RootState, Cart>(state => state.cart)

    return (
        <div className="flex flex-col pb-24">
            {
                cart.products.length > 0 ?
                    <ul className="divide-y divide-zinc-100">
                        {
                            cart.products.map(product => {
                                return (
                                    <li key={product.product_uid} className="grid grid-cols-12 gap-2 px-2 py-6">
                                        <img src="/product-placeholder.jpg" alt="" className="object-cover h-auto w-full col-span-3 rounded-md" />
                                        <div className="col-span-7">
                                            <h2 className="font-semibold">{product.product_name}</h2>
                                            <p>CHF. {product.product_price}</p>
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-3">
                                            <p className="p-1 bg-zinc-100 rounded-full text-center">x{product.product_qty}</p>
                                            <button onClick={() => dispatch(removeProduct(product.product_uid))} className="bg-zinc-200 rounded-full p-1 w-full cursor-pointer flex items-center justify-center">
                                                <svg className="w-5 h-5" strokeWidth={1} stroke="currentColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul> :
                    <div className="mt-24 flex flex-col items-center gap-2">
                        <svg className="w-16 h-16 text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <p className="bg-zinc-100 p-2 rounded-full">No products</p>
                    </div>
            }
        </div>
    )
}

export default Order