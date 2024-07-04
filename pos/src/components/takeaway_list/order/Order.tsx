import { useState } from "react"
import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"
import { formatDateAndTime } from "../../../utils/format/formatDateAndTime"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../../store/current_order/currentOrderSlice"
import { useGetTakeawayOrdersDataQuery, useRemoveTkwOrderMutation } from "../../../store/api/apiSlice"
import type { AppDispatch, RootState } from "../../../store/store"
import type { CurrentOrder } from "../../types"

const Order = ({ order }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { currentOrderId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const [removeTkwOrder, { isLoading }] = useRemoveTkwOrderMutation()
    const { refetch } = useGetTakeawayOrdersDataQuery()
    const [open, setOpen] = useState(false)

    const handleSelect = () => dispatch(setCurrentOrder(order.id))

    const handleDelete = async () => {
        await removeTkwOrder(order.id)
        dispatch(setCurrentOrder(null))
        refetch()
    }

    const handleOpen = (e) => {
        e.stopPropagation()
        setOpen(!open)
    }


    return (
        <tr className={isLoading ? "opacity-50" : null}>
            <td onClick={handleSelect} className={`${currentOrderId === order.id ? "bg-neutral-100" : null} col-span-1 px-4 grid grid-cols-12 gap-4 py-5 cursor-pointer`}>
                <div className="font-semibold col-span-2">#{formatOrderNumber(order.id)}</div>
                <div className="col-span-4 overflow-hidden whitespace-nowrap text-ellipsis w-[85%]">
                    <span>{order.name}</span> 
                    {order.details.table  ? <span>(Tisch: {order.details.table})</span> : null }
                </div>
                <div className="col-span-3">{formatDateAndTime(order.details.created_at)}</div>
                <div className="col-span-2 text-yellow-500 font-semibold">{order.status.name}</div>
                <div className="col-span-1">
                    <button onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>
            </td>
            {
                open ?
                    <td className="grid grid-cols-12 pb-4">
                        <dl className="col-start-2 col-span-11 flex flex-col gap-1 p-4 rounded-lg">
                            <div className="flex gap-3">
                                <dt className="font-semibold">Payment Method:</dt>
                                <dd>{order.details.payment_method.name}</dd>
                            </div>
                            <div className=" py-5 rounded-md mt-2">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-zinc-300 p-3 text-left">Q</th>
                                            <th className="border border-zinc-300 p-3 text-left">Artikel</th>
                                            <th className="border border-zinc-300 p-3 text-left">CHF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.cart.products.map(product => {
                                                return (
                                                    <>
                                                        <tr key={product.uid}>
                                                            <td className="border border-zinc-300 p-3">{product.qty}</td>
                                                            <td className="border border-zinc-300 p-3 flex-1" style={{ "flex": 1 }}>
                                                                {product.name}
                                                            </td>
                                                            <td className="border border-zinc-300 p-3 w-[55px]" style={{ "width": "55px" }}>
                                                                {(product.total).toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        {/* {
                                                            product.product_variations.length > 0 ?
                                                                variation.value.map((variation) => {
                                                                    return (
                                                                        <tr key={variation.id}>
                                                                            <td className="border border-zinc-300 p-3 text-xs"></td>
                                                                            <td className="border border-zinc-300 p-3 text-xs">{variation.value}</td>
                                                                            <td className="border border-zinc-300 p-3 text-xs"> - </td>
                                                                        </tr>
                                                                    )
                                                                }) : null
                                                        } */}
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleDelete} className="alert-button text-white px-8 py-3">Delete</button>
                            </div>
                        </dl>
                    </td> : null
            }
        </tr>
    )
}

export default Order