import { useSelector } from "react-redux"
import { MouseEvent } from "react"
import { formatPrice } from "../../../../utils/format/formatPrice"
import { useGetCompletedOrderByIdQuery, useUpdateCompletedOrderProductsMutation } from "../../../../store/api/apiSlice"

const Item = ({ product }) => {

    const { completedOrderToEditId } = useSelector(state => state.currentOrder)
    const { refetch } = useGetCompletedOrderByIdQuery(completedOrderToEditId)
    const [updateCompletedOrderProducts, { isLoading: isUpdating }] = useUpdateCompletedOrderProductsMutation()

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const response = await updateCompletedOrderProducts({ 
            orderId: completedOrderToEditId,
            method: "remove",
            productId: product.uid
        })
        // console.log(response)
        refetch()
    }

    return (
        <li className={`${isUpdating && "opacity-40"} flex gap-6 p-4 justify-between items-start`}>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <p className="font-semibold">{product.qty}</p>
                        <dt className="truncate max-w-52">{product.name}</dt>
                    </div>
                    <dd className="font-semibold">
                        <span className="text-sm">CHF </span>
                        {formatPrice(product.total.toFixed(2))}
                    </dd>
                </div>
                {
                    product.variations ?
                        product.variations.map(variation => {
                            return (
                                <div key={variation.timestamp} className="flex justify-between gap-2 pl-4 text-zinc-400 text-xs">
                                    <p>{variation.option_name}</p>
                                    <dt className="truncate max-w-60">
                                        <span>CHF. </span>
                                        {formatPrice(variation.option_price)}
                                    </dt>
                                </div>
                            )
                        }) : null
                }
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