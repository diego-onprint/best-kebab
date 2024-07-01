import { useState } from "react"
import toast from "react-hot-toast"
import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"
import { formatDateAndTime } from "../../../utils/format/formatDateAndTime"
import { useUpdateCompletedOrderStatusMutation } from "../../../store/api/apiSlice"
import OrderDetails from "./order_details/OrderDetails"

const Order = ({ order, refetch, ordersToShow }) => {

    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [updateOrderStatus, { isLoading }] = useUpdateCompletedOrderStatusMutation()
    const deleted = order?.status.value === "deleted"

    const getStatus = () => {
        if (order.status.value === "completed") return "text-green-600"
        if (deleted) return "text-red-600"
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        setOpenModal(true)
    }

    const handleDeleteOrder = async () => {

        try {

            await updateOrderStatus({ id: order.id, status: { name: "Deleted", value: "deleted" } })
            await refetch()
            toast.success("Bestellung gelöscht")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <tr>
                <td onClick={() => setOpen(!open)} className="col-span-1 grid grid-cols-12 gap-4 py-5 items-center cursor-pointer">
                    <div className="font-semibold col-span-2">#{formatOrderNumber(order.id)}</div>
                    <div className={`col-span-2 overflow-hidden whitespace-nowrap text-ellipsis w-[85%] text-sm`}>{order.name}</div>
                    <div className="col-span-3 text-sm font-semibold">{formatDateAndTime(order.tmstamp)}</div>
                    <div className={`${getStatus()} font-semibold col-span-2 text-sm overflow-hidden truncate`}>{order.status.name}</div>
                    <div className={` col-span-2 text-sm`}><span className="text-[12px] text-zinc-500">CHF </span>{order.cart.total.toFixed(2)}</div>
                    <div className="col-span-1 grid place-items-center">
                        {
                            ordersToShow !== "deleted" ?
                                <button onClick={handleDelete} className="text-red-400 cursor-pointer" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                    </svg>
                                </button> : null
                        }
                    </div>
                </td>
                {open ? <OrderDetails order={order} /> : null}
            </tr>
            {
                openModal ?
                    <div onClick={() => setOpenModal(false)} className="modal-overlay bg-opacity-10">
                        <div onClick={(e) => e.stopPropagation()} className="px-4 py-8 bg-white rounded-md grid grid-cols-12 gap-4 w-72 shadow-md">
                            <button onClick={() => setOpenModal(false)} className="secondary-button col-span-6">Abbrechen</button>
                            <button onClick={handleDeleteOrder} className="alert-button col-span-6">Löschen</button>
                        </div>
                    </div> : null
            }
        </>
    )
}

export default Order