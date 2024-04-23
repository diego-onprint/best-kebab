import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../../store/cart/cartSlice"
import { clearTableCart } from "../../store/tables/tablesSlice"
import { RootState, AppDispatch } from "../../store/store"
import { formatCart } from "../../utils/format/formatCart"
import { printTicket } from "../../utils/print/printTicket"
import { useTicketContext } from "../../context/TicketContext"
import { setOrderType, setPaymentMethod } from "../../store/ticket/ticketSlice"
import View from "./View"
import type { Cart, Table, TicketDataType } from "../../types"
import { CustomerData } from "../../models/customer_data.model"
import { useActiveOrder } from "../../hooks/useActiveOrder"
import { updateOrderPaymentMethod } from "../../store/orders/ordersSlice"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

// TODO handle openchekout with parameters in url instead?

const Controller = ({ setOpenCheckout }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    // const ticket = useSelector<RootState, TicketDataType>(state => state.ticket)
    // const { ticketDomRef, customerData, setCustomerData, setOrderNumber } = useTicketContext()
    const [printReceipt, setPrintReceipt] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const order = useActiveOrder()

    const handleCancel = () => {
        setOpenCheckout(false)
    }

    const handlePaymentMethod = (method: TicketDataType["paymentMethod"]) => {
        dispatch(updateOrderPaymentMethod(method))
    }

    const handleCheckout = async () => {

        console.log(order)

        setLoading(true)

        // PLACE ORDER IN WOOCOMMERCE
        try {

            const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://lovely-burger-pos.diegoui.com.ar/api/new-local-order"

            const formattedCart = formatCart(order.cart.products)
            
            const formattedOrder = {
                payment_method: order.customerData.paymentMethod.name,
                payment_method_title: order.customerData.paymentMethod.name,
                set_paid: true,
                billing: {
                    first_name: order.isTkw ? order.customerData.name : order.name,
                    last_name: order.customerData.surname,
                    address_1: order.customerData.address,
                    city: order.customerData.city,
                    postcode: order.customerData.postcode,
                    email: order.isTkw ? order.customerData.email : "mandatory@someemail.com",
                    phone: order.customerData.phone,
                },
                shipping: {
                    first_name: order.name,
                },
                line_items: formattedCart,
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedOrder)
            }

            const response = await fetch(newOrderUrl, options)

            const json = await response.json()

            if (json.result.data?.status === 400) {
                setError("An error ocurred placing order in Woocommerce")
            }

            console.log("JSON", json)




            // // currentTable ? dispatch(clearTableCart()) : dispatch(clearCart())
            // setOrderNumber(json.result.number)

            // SEND THE ORDER NUMBER TO THE TICKET TO PRINT

            // DELETE ORDER FROM STORE AND LOCAL STORAGE

            // SET CART TO -1

            // setTimeout(() => {
            //     printTicket(ticketDomRef.current)
            //     setOrderNumber("")
            // }, 500)
            // setOpenCheckout(false)

        } catch (err) {

            console.error(err)
            setError("An error ocurred placing order in Woocommerce")

        } finally {

            setLoading(false)
        }
    }

    return (
        <View
            loading={loading}
            handleCancel={handleCancel}
            order={order}
            printReceipt={printReceipt}
            setPrintReceipt={setPrintReceipt}
            handlePaymentMethod={handlePaymentMethod}
            handleCheckout={handleCheckout}
            error={error}
        />
    )
}

export default Controller