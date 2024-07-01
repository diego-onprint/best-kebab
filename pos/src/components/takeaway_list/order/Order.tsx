import { useState } from "react"
import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"
import { formatDateAndTime } from "../../../utils/format/formatDateAndTime"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../../store/current_order/currentOrderSlice"
import { useGetTakeawayOrdersDataQuery, useRemoveTkwOrderMutation, useUpdateOrderDataMutation } from "../../../store/api/apiSlice"
import type { AppDispatch } from "../../../store/store"

import OrderDetails from "./order_details/OrderDetails"

const Order = ({ order }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { currentOrderId } = useSelector(state => state.currentOrder)
    const [removeTkwOrder, { isLoading }] = useRemoveTkwOrderMutation()
    const [updateOrderData, { isLoading: isUpdatisg }] = useUpdateOrderDataMutation()
    const { refetch } = useGetTakeawayOrdersDataQuery()
    const [open, setOpen] = useState(false)

    const handleSelect = () => dispatch(setCurrentOrder(order.id))

    const handleDispatchOrder = async (e) => {
        e.stopPropagation()
        console.log("Dispatch", order)

        await updateOrderData({ orderId: order.id, method: "updateStatus", status: { name: "To deliver", value: "ready" }, email: order.details.customer_data.email})

        refetch()
    }

    const handleDelete = async () => {
        await removeTkwOrder(order.id)
        dispatch(setCurrentOrder(null))
        refetch()
    }

    const handleOpen = (e) => {
        e.stopPropagation()
        setOpen(!open)
    }

    const getStatus = () => {
        switch (order.status.value) {
            case "process":
                return "text-yellow-500"
            case "ready":
                return "text-green-500"
        }
    }

    return (
        <tr className={isLoading ? "opacity-50" : null}>
            <td onClick={handleSelect} className={`${currentOrderId === order.id ? "bg-neutral-50" : null} col-span-1 grid grid-cols-12 gap-1 px-3 py-5 cursor-pointer`}>
                <div className="col-span-1">
                    <button onClick={handleOpen} className="bg-zinc-50 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold">#{formatOrderNumber(order.id)}</p>
                </div>
                <div className="col-span-3 space-y-1">
                    <p className="overflow-hidden truncate w-[85%] text-sm">
                        <span>{order.name}</span>
                        {order.details.table ? <span>(Tisch: {order.details.table})</span> : null}
                    </p>
                    <p className="text-xs">{formatDateAndTime(order.details.created_at)}</p>
                </div>
                <p className={`col-span-2 ${getStatus()} font-semibold text-sm`}>
                    {order.status.name}
                </p>
                <div className="col-span-4 text-zinc-300 flex justify-end">
                    <button onClick={handleDispatchOrder} className="flex gap-2 items-center text-xs primary-button">
                        <span className="text-left font-semibold">Bereits zu abholung</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </button>
                </div>
            </td>
            {open ? <OrderDetails order={order} handleDelete={handleDelete} /> : null}
        </tr>
    )
}

export default Order