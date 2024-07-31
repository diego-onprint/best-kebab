import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import usePrintTickets from "../../hooks/usePrintTickets"
import CheckoutView from "./CheckoutView"
// import Notification from "../notification/Notification"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import { useCreateNewCompletedOrderMutation, useGetOrderDataByIdQuery, useGetTablesDataQuery, useGetTakeawayOrdersDataQuery, useRemoveTkwOrderMutation } from "../../store/api/apiSlice"
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

const CheckoutController = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [printReceipt, setPrintReceipt] = useState()
    const [createNewOrder, { isLoading: isUpdating }] = useCreateNewCompletedOrderMutation()
    const { type: orderType } = useSelector<RootState, { type: OrderType }>(state => state.orderType)
    const { method: paymentMethod } = useSelector<RootState, { method: PaymentMethod }>(state => state.paymentMethod)
    const { currentOrderId } = useSelector(state => state.currentOrder)
    const { page, limit, condition } = useSelector(state => state.ordersPage)
    const { refetchOrdersByPage } = useRefetchOrders()
    const { data: order } = useGetOrderDataByIdQuery(currentOrderId)
    // const { refetch: refetchTables } = useGetTablesDataQuery()
    // const {refetch: refetchTkwOrders} = useGetTakeawayOrdersDataQuery()
    // const [removeTkwOrder] = useRemoveTkwOrderMutation()
    // const { removeAllProducts } = useProductActions()
    const { handlePrint } = usePrintTickets()
    
    const handleCancel = () => {
        dispatch(setCheckoutMenu(false))
    }

    const handlePaymentMethod = (method: PaymentMethod) => {
        dispatch(setPaymentMethod(method))
    }

    const handleOrderType = (type) => {
        dispatch(setOrderType(type))
    }

    const handleTicketPrint = () => {
        handlePrint("shop")
    }

    const handleCheckout = async () => {

        //SEND PAYMENT METHOD
        try {

            const orderData = {
                id: order.id,
                details: {
                    payment_method: paymentMethod,
                    order_type: orderType,
                    created_by: "admin", // Use session
                },
                status: { name: "Completed", value: "completed" },
            }

            const response = await createNewOrder(orderData)

            console.log(response)

            if (response?.data.error) {
                toast.error("Error creating the order")
            }
            
            socket.emit("order-status-updated", { success: true })

            if (printReceipt) handleTicketPrint()

            toast.success("Completed order created")

            refetchOrdersByPage({ page, limit, condition })
            dispatch(setCheckoutMenu(false))
            dispatch(setCurrentOrder(null))

        } catch (err) {

            console.log(err)
        }
    }

    return (
        <>
            <CheckoutView
                order={order}
                paymentMethod={paymentMethod}
                orderType={orderType}
                handleOrderType={handleOrderType}
                handlePrint={handleTicketPrint}
                handleCancel={handleCancel}
                handlePaymentMethod={handlePaymentMethod}
                handleCheckout={handleCheckout}
                printReceipt={printReceipt}
                setPrintReceipt={setPrintReceipt}
                isUpdating={isUpdating}
            />
            {/* {notification ? <Notification message={notification} /> : null} */}
        </>
    )
}

export default CheckoutController