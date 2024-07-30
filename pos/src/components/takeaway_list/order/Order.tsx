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

    const handleSelect = () => dispatch(setCurrentOrder(order.id))

    const handleDelete = async () => {
        await removeTkwOrder(order.id)
        dispatch(setCurrentOrder(null))
        refetch()
    }

    const getColor = (value) => {
        switch (value) {
            case "completed":
                return "text-green-500"
            case "ready":
                return "text-green-500"
            case "process":
                return "text-yellow-500"
            default:
                return "text-zinc-900"
        }
    }

    return (
        <tr className={isLoading ? "opacity-50" : null}>
            <td onClick={handleSelect} className={`${currentOrderId === order.id ? "bg-neutral-100" : null} col-span-1 px-4 grid grid-cols-12 gap-4 py-5 cursor-pointer text-sm`}>
                <div className="font-semibold col-span-2">#{formatOrderNumber(order.id)}</div>
                <div className="col-span-2 overflow-hidden truncate w-[85%]">
                    <span>{order.name}</span>
                    {order.details.table ? <span>(Tisch: {order.details.table})</span> : null}
                </div>
                <div className="col-span-3">{formatDateAndTime(order.details.created_at)}</div>
                <div className={`${getColor(order.status.value)} col-span-2 font-semibold`}>{order.status.name}</div>
                <div className="col-span-1">
                    <button onClick={handleDelete} className="text-red-400 cursor-pointer" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default Order