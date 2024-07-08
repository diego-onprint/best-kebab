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

    // const handleDelete = async () => {
    //     await removeTkwOrder(order.id)
    //     dispatch(setCurrentOrder(null))
    //     refetch()
    // }

    const getColor = (value) => {
        switch (value) {
            case "completed":
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

                </div>
            </td>
        </tr>
    )
}

export default Order