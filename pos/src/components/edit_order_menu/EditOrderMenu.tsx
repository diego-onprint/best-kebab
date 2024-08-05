import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import usePrintTickets from "../../hooks/usePrintTickets"
import CheckoutView from "./CheckoutView"
// import Notification from "../notification/Notification"
import { setCheckoutMenu, setEditOrderMenu } from "../../store/menus/menusSlice"
import { useCreateNewCompletedOrderMutation, useGetOrderDataByIdQuery, useGetTablesDataQuery, useGetTakeawayOrdersDataQuery, useRemoveTkwOrderMutation, useUpdateOrderDetailsMutation } from "../../store/api/apiSlice"
// import { useNotification } from "../../hooks/useNotification"
// import { formatOrderNumber } from "../../utils/format/formatOrderNumber"
import { useNavigate } from "react-router-dom"
import { setCurrentOrder } from "../../store/current_order/currentOrderSlice"
import useProductActions from "../../hooks/useProductActions"
import type { CurrentOrder, PaymentMethod, OrderType } from "../../types"
import type { RootState, AppDispatch } from "../../store/store"
import { setOrderType } from "../../store/order_type/orderTypeSlice"
import { setPaymentMethod } from "../../store/payment_method/paymentMehtodSlice"
import toast from "react-hot-toast"
import socket from "../../socket"
import useRefetchOrders from "../../hooks/useRefetchOrders"
import Form from "./form/Form"
import Spinner from "../common/spinner/Spinner"
import useRefetchOrderById from "../../hooks/useRefetchOrderById"

const EditOrderMenu = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [printReceipt, setPrintReceipt] = useState()
    const [createNewOrder, { isLoading: isUpdating }] = useCreateNewCompletedOrderMutation()
    const { type: orderType } = useSelector<RootState, { type: OrderType }>(state => state.orderType)
    const { method: paymentMethod } = useSelector<RootState, { method: PaymentMethod }>(state => state.paymentMethod)
    const { currentOrderId } = useSelector(state => state.currentOrder)
    const { refetchOrderById } = useRefetchOrderById()
    const { page, limit, condition } = useSelector(state => state.ordersPage)
    const { refetchOrdersByPage } = useRefetchOrders()
    const { data: order } = useGetOrderDataByIdQuery(currentOrderId)
    const [updateOrderDetails, { isLoading: isUpdatingDetails }] = useUpdateOrderDetailsMutation()

    const [orderData, setOrderData] = useState(order.details)

    const handleClose = () => dispatch(setEditOrderMenu(false))

    const handlePaymentMethod = (method) => {
        setOrderData({ ...orderData, payment_method: method })
    }

    const handleOrderType = (type) => {
        setOrderData({ ...orderData, order_type: type })
    }

    console.log(orderData)

    const handleUpdate = async () => {
        const response = await updateOrderDetails({ id: currentOrderId, details: orderData })
        console.log("Response....", response)

        if (response.data.success) {
            refetchOrderById(currentOrderId)
            toast.success("Order updated")
            return handleClose()
        }

        return toast.error("Error updating order")
    }

    return (
        <div onClick={handleClose} className="dont-print grid place-items-center fixed inset-0 bg-zinc-950/30 z-[100]">
            <div onClick={(e) => e.stopPropagation()} className="relative grid grid-cols-12 bg-white divide-x rounded-md py-6 px-2 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Zahlungsmethode</h3>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Barzahlung", value: "cash" })}
                            className={`button-base border border-zinc-200 ${orderData.payment_method.value === "cash" && "bg-zinc-200"}`}
                        >
                            Barzahlung
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Kreditkarten", value: "credit" })}
                            className={`button-base border border-zinc-200 ${orderData.payment_method.value === "credit" && "bg-zinc-200"}`}
                        >
                            Kreditkarten
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Twint", value: "twint" })}
                            className={`button-base border border-zinc-200 ${orderData.payment_method.value === "twint" && "bg-zinc-200"}`}
                        >
                            Twint
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Lunchcheck", value: "lunchcheck" })}
                            className={`button-base border border-zinc-200 ${orderData.payment_method.value === "lunchcheck" && "bg-zinc-200"}`}
                        >
                            Lunchcheck
                        </button>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-2 px-6">
                    <Form setOrderData={setOrderData} orderData={orderData} />
                </div>
                <div className="col-span-4 flex flex-col gap-4 divide-y divide-zinc-200 px-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Orde Type</h3>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => handleOrderType({ name: "Lieferung", value: "lieferung" })}
                                className={`button-base border border-zinc-200 ${orderData.order_type.value === "lieferung" && "bg-zinc-200"}`}
                            >
                                Lieferung
                            </button>
                            <button
                                onClick={() => handleOrderType({ name: "Abholung", value: "abholung" })}
                                className={`button-base border border-zinc-200 ${orderData.order_type.value === "abholung" && "bg-zinc-200"}`}
                            >
                                Abholung
                            </button>
                            <button
                                onClick={() => handleOrderType({ name: "Tisch", value: "tisch" })}
                                className={`button-base border border-zinc-200 ${orderData.order_type.value === "tisch" && "bg-zinc-200"}`}
                            >
                                Tisch
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-2 pt-4 justify-end">
                        <button onClick={handleClose} disabled={isUpdating} className="secondary-button col-span-3">
                            Abbrechen
                        </button>
                        <button onClick={handleUpdate} disabled={isUpdating} className="primary-button col-span-6">
                            {
                                isUpdatingDetails ?
                                    <Spinner /> :
                                    "Aktualisieren"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrderMenu