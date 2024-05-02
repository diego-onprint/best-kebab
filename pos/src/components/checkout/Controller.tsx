import { useDispatch, useSelector } from "react-redux"
import usePrintTickets from "../../hooks/usePrintTickets"
import View from "./View"
import Notification from "../notification/Notification"
import type { Order, PaymentMethod } from "../../types"
import type { RootState } from "../../store/store"
import { useUpdateOrderInDbAndStore } from "../../hooks/useUpdateOrderInDbAndStore"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import { useCreateNewCompletedOrderMutation } from "../../store/api/apiSlice"
import { useNotification } from "../../hooks/useNotification"
import { formatOrderNumber } from "../../utils/format/formatOrderNumber"
import { useNavigate } from "react-router-dom"
import { setCurrentOrderId } from "../../store/current_order/currentOrderSlice"

const Controller = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { updateOrder, isUpdating } = useUpdateOrderInDbAndStore()
    const [createNewOrder, { isLoading }] = useCreateNewCompletedOrderMutation()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const { printClientTicket } = usePrintTickets()
    const { notification, showNotification } = useNotification()

    const handleCancel = () => {
        dispatch(setCheckoutMenu(false))
    }

    const handlePaymentMethod = (method: PaymentMethod) => {
        const updatedOrder = {
            ...currentOrder,
            data: {
                ...currentOrder.data,
                customerData: {
                    ...currentOrder.data.customerData,
                    paymentMethod: method
                }
            }
        }

        updateOrder(updatedOrder)
    }

    const handleCheckout = async () => {

        const formattedData = {
            created_by: "admin",
            status: { name: "Completed", value: "completed" },
            date_created: new Date().toISOString().slice(0, -5),
            order_name: currentOrder.data.name,
            cart: currentOrder.data.cart,
            customer: currentOrder.data.customerData,
        }

        try {

            const response = await createNewOrder(formattedData)
            const orderId = response.data.rows[0].order_id

            if (response?.error) {
                return showNotification("Error creating the order", 3000)
            }

            showNotification(`Order #${formatOrderNumber(orderId)} was created`, 3000)

            // RESET FROM LOCAL AND DB THE TABLE/ORDER
            const updatedOrder = {
                ...currentOrder,
                data: {
                    ...currentOrder.data,
                    cart: {
                        ...currentOrder.data.cart,
                        products: [],
                        total: 0
                    }
                }
            }

            updateOrder(updatedOrder)

            // Delay to sync with notification
            // Else make Context for notification
            setTimeout(() => {
                dispatch(setCheckoutMenu(false))
                dispatch(setCurrentOrderId(""))
                navigate("/tables")
            }, 3000)

        } catch (err) {

            console.log("Error creating order: ", err)
        }

    }

    return (
        <>
            <View
                order={currentOrder}
                handlePrint={printClientTicket}
                handleCancel={handleCancel}
                handlePaymentMethod={handlePaymentMethod}
                handleCheckout={handleCheckout}
                isUpdating={isUpdating}
                isLoading={isLoading}
            />
            {notification ? <Notification message={notification} /> : null}
        </>
    )
}

export default Controller