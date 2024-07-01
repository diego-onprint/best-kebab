import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import { setCurrentOrder } from "../../store/current_order/currentOrderSlice"
import { useCreateNewCompletedOrderMutation, useGetOrderDataByIdQuery, useGetTablesDataQuery, useGetTakeawayOrdersDataQuery, useRemoveTkwOrderMutation } from "../../store/api/apiSlice"
import { setOrderType } from "../../store/order_type/orderTypeSlice"
import { setPaymentMethod } from "../../store/payment_method/paymentMehtodSlice"
import toast from "react-hot-toast"
import usePrintTickets from "../../hooks/usePrintTickets"
import useProductActions from "../../hooks/useProductActions"
import CheckoutView from "./CheckoutView"
import type { CurrentOrder, PaymentMethod, OrderType } from "../../types"
import type { RootState, AppDispatch } from "../../store/store"

const CheckoutController = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [printReceipt, setPrintReceipt] = useState()
    const [createNewOrder, { isLoading: isUpdating }] = useCreateNewCompletedOrderMutation()
    const { type: orderType } = useSelector<RootState, { type: OrderType }>(state => state.orderType)
    const { method: paymentMethod } = useSelector<RootState, { method: PaymentMethod }>(state => state.paymentMethod)
    const { currentOrderId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { data: order } = useGetOrderDataByIdQuery(currentOrderId)
    const { refetch: refetchTables } = useGetTablesDataQuery()
    const { refetch: refetchTkwOrders } = useGetTakeawayOrdersDataQuery()
    const [removeTkwOrder] = useRemoveTkwOrderMutation()
    const { removeAllProducts } = useProductActions()
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
                    // status: { name: "Completed", value: "completed" },
                    created_by: "admin", // Use session
                },
            }

            const response = await createNewOrder(orderData)

            if (response?.data.error) {
                return toast.error("Error creating the order")
            }

            toast.success(`Neu Bestellung #${response.data.id}`)

            if (printReceipt) handleTicketPrint()

            if (order.is_table) {
                await removeAllProducts()
                refetchTables()
            }

            if (order.is_tkw) {
                await removeTkwOrder(order.id)
                refetchTkwOrders()
            }
            
            // Reset order from orders table
            dispatch(setCheckoutMenu(false))
            dispatch(setCurrentOrder(null))
            navigate("/takeaway")

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