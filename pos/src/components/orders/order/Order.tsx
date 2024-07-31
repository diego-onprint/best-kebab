import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"
import { formatDateAndTime } from "../../../utils/format/formatDateAndTime"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../../store/current_order/currentOrderSlice"
import { useDeleteOrderMutation } from "../../../store/api/apiSlice"
import useRefetchOrders from "../../../hooks/useRefetchOrders"

const Order = ({ order }) => {

    const dispatch = useDispatch()
    const { page, limit, condition } = useSelector(state => state.ordersPage)
    const { refetchOrdersByPage } = useRefetchOrders()
    const [deleteOrder, { isLoading }] = useDeleteOrderMutation() 

    const handleClick = () => {
        dispatch(setCurrentOrder(order.id))
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        deleteOrder(order.id)
        refetchOrdersByPage({ page, limit, condition })
        dispatch(setCurrentOrder(null))
    }

    const getColor = (value) => {
        switch (value) {
            case "completed":
                return "text-blue-500"
            case "ready":
                return "text-green-500"
            case "process":
                return "text-yellow-500"
            default:
                return "text-zinc-900"
        }
    }

    return (
        <tr className={`${isLoading && "opacity-50"}`}>
            <td onClick={handleClick} className="col-span-1 grid grid-cols-12 gap-2 py-5 items-center cursor-pointer text-sm">
                <div className="font-semibold col-span-2">#{formatOrderNumber(order.id)}</div>
                <div className={`col-span-2 overflow-hidden truncate w-[85%]`}>{order.name}</div>
                <div className="col-span-3 overflow-hidden truncate">{formatDateAndTime(order.details.created_at)}</div>
                <div className={`${getColor(order.status.value)} font-semibold col-span-2`}>{order.status.name}</div>
                <div className={`col-span-2`}><span className="text-[10px] text-zinc-400">CHF </span>{order.cart.total.toFixed(2)}</div>
                <div>
                    <button onClick={handleDelete} className="text-red-400" type="button">
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