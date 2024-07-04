import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"
import { formatDateAndTime } from "../../../utils/format/formatDateAndTime"
// import { useUpdateCompletedOrderStatusMutation } from "../../../store/api/apiSlice"
import { useDispatch } from "react-redux"
import { setCompletedOrderToEdit } from "../../../store/current_order/currentOrderSlice"

const Order = ({ order }) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setCompletedOrderToEdit(order.id))
    }

    return (
        <tr>
            <td onClick={handleClick} className="col-span-1 grid grid-cols-12 gap-2 py-5 items-center cursor-pointer text-sm">
                <div className="font-semibold col-span-2">#{formatOrderNumber(order.id)}</div>
                <div className={`col-span-2 overflow-hidden truncate w-[85%]`}>{order.name}</div>
                <div className="col-span-3 overflow-hidden truncate">{formatDateAndTime(order.tmstamp)}</div>
                <div className={`font-semibold col-span-2 text-green-500`}>{order.status.name}</div>
                <div className={`col-span-2`}><span className="text-[10px] text-zinc-400">CHF </span>{order.cart.total.toFixed(2)}</div>
            </td>
        </tr>
    )
}

export default Order