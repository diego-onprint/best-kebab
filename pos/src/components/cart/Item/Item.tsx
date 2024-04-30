import { MouseEvent } from "react"
import { useSelector } from "react-redux"
import { formatPrice } from "../../../utils/format/formatPrice"
import { RootState } from "../../../store/store"
import { Order } from "../../../types"
import { useUpdateOrderInDbAndStore } from "../../../hooks/useUpdateOrderInDbAndStore"

const Item = ({ product }) => {

    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const { updateOrder, isUpdating } = useUpdateOrderInDbAndStore()

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {

        e.stopPropagation()

        const updatedOrderProducts = currentOrder.data.cart.products.filter(prd => prd.product_uid !== product.product_uid)

        const updatedOrder = {
            ...currentOrder,
            data: {
                ...currentOrder.data,
                cart: {
                    ...currentOrder.data.cart,
                    products: updatedOrderProducts
                }
            }
        }

        updateOrder(updatedOrder)
    }

    return (
        <li className={`${isUpdating && "opacity-40"} flex gap-6 p-4 justify-between items-start`}>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <p className="font-semibold">{product.product_qty}</p>
                        <dt className="truncate max-w-52">{product.product_name}</dt>
                    </div>
                    <dd className="font-semibold">
                        <span className="text-sm">CHF. </span>
                        {formatPrice(product.product_price)}
                    </dd>
                </div>
                {/* LOOP OVER ARRAY OF VARIATION OPTIONS SELECTED */}
                {/* {
                    product.variations ?
                        product.variations.map(variation => {
                            return (
                                <div key={variation.timestamp} className="flex justify-between gap-2 pl-4 text-zinc-400">
                                    <p>{variation.name}</p>
                                    <dt className="truncate max-w-60">
                                        <span className="text-sm">CHF. </span>
                                        {formatPrice(variation.price)}
                                    </dt>
                                </div>
                            )
                        }) : null
                } */}
            </div>
            <div className="flex gap-10">
                <button onClick={handleDelete} className="text-red-400 cursor-pointer" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </li>
    )
}

export default Item