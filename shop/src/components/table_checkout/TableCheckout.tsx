import { useDispatch, useSelector } from "react-redux"
import { removeProduct } from "../../store/cart/cartSlice"
import { AppDispatch } from "../../store/store"

const TableCheckout = () => {

    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector(state => state.cart)

    const handleRemove = (uid) => {
        dispatch(removeProduct(uid))
    }

    return (
        <section className="mt-2">
            {
                cart.products.length > 0 ?
                    <ul className="flex flex-col gap-6 border border-zinc-200 p-3 rounded-lg divide-y divide-zinc-200 overflow-y-auto">
                        {
                            cart.products.map(product => {
                                return (
                                    <li className="flex flex-col gap-1 pt-6 first:pt-0" key={product.uid}>
                                        <div className="flex justify-between gap-2">
                                            <p className="flex-1 text-xl font-semibold overflow-hidden truncate">{product.name}</p>
                                            <p className="flex-0">
                                                <span className="text-zinc-400">CHF </span>
                                                <span className="font-semibold text-lg">{product.price}</span>
                                            </p>
                                        </div>
                                        {
                                            product.variations.length > 0 ?
                                                <ul className="flex flex-col gap-1">
                                                    {
                                                        product.variations.map(variation => {
                                                            return (
                                                                <div className="flex justify-between pl-2" key={variation.uid}>
                                                                    <p className="">{variation.option_name}</p>
                                                                    <p className="">
                                                                        <span className="text-zinc-400">CHF </span>
                                                                        <span>{variation.option_price}</span>
                                                                    </p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </ul> : null
                                        }
                                        <button onClick={() => handleRemove(product.uid)} className="secondary-button text-xs self-start mt-2 p-1 rounded-md">Entfernen</button>
                                    </li>
                                )
                            })
                        }
                    </ul> :
                    <p>Cart is empty</p>
            }
        </section>
    )
}

export default TableCheckout