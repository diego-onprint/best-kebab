import { Dispatch, SetStateAction, useState } from "react"
import { useSelector } from "react-redux"
import usePrintTickets from "../../hooks/usePrintTickets"
import View from "./View"
import type { Order, PaymentMethod } from "../../types"
import type { RootState } from "../../store/store"
import { useUpdateOrderInDbAndStore } from "../../hooks/useUpdateOrderInDbAndStore"
// import { clearCart } from "../../store/cart/cartSlice"
// import { clearTableCart } from "../../store/tables/tablesSlice"
// import { RootState, AppDispatch } from "../../store/store"
// import { formatCart } from "../../utils/format/formatCart"
// import { printTicket } from "../../utils/print/printTicket"
// import { useTicketContext } from "../../context/TicketContext"
// import { setOrderType, setPaymentMethod } from "../../store/ticket/ticketSlice"
// import type { Cart, Table, TicketDataType } from "../../types"
// import { CustomerData } from "../../models/customer_data.model"
// import { removeOrder, setCurrentOrder, updateOrderPaymentMethod, updateWooOrderNumber } from "../../store/orders/ordersSlice"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

// TODO handle openchekout with parameters in url instead?

const Controller = ({ setOpenCheckout }: PropsTypes) => {

    const { updateOrder, isUpdating } = useUpdateOrderInDbAndStore()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const { printClientTicket } = usePrintTickets()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleCancel = () => {
        setOpenCheckout(false)
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

    const handleCheckout = () => {
        console.log("checkout")
    }

    return (
        <View
            order={currentOrder}
            printClientTicket={printClientTicket}
            handleCancel={handleCancel}
            handlePaymentMethod={handlePaymentMethod}
            handleCheckout={handleCheckout}
            isUpdating={isUpdating}
            loading={loading}
            error={error}
        />
    )

    // const handlePaymentMethod = (method: TicketDataType["paymentMethod"]) => {
    //     dispatch(updateOrderPaymentMethod(method))
    // }

    // const handleCheckout = async () => {

    //     setLoading(true)

    //     // PLACE ORDER IN WOOCOMMERCE

    //     try {

    //         const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://lovely-burger-pos.diegoui.com.ar/api/new-local-order"

    //         console.log("JSON", json)

    //         if (printReceipt) {

    //             setWooOrderNumber(json.result.id)

    //             setTimeout(async () => {
    //                 await printTicket(ticketDomRef.current)
    //                 setWooOrderNumber(0)
    //             }, 1000)
    //         }

    //         // Remove current order - set current order to -1
    //         dispatch(setCurrentOrder(-1))

    //         // Delete order from store and local storage 
    //         dispatch(removeOrder(order.id))

    //         setOpenCheckout(false)

    //     } catch (err) {

    //         console.error(err)
    //         setError("An error ocurred placing order in Woocommerce")

    //     } finally {

    //         setLoading(false)
    //     }
    // }
}

export default Controller