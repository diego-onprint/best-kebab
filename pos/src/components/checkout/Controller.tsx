import { Dispatch, SetStateAction, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../../store/cart/cartSlice"
import { clearTableCart } from "../../store/tables/tablesSlice"
import { RootState, AppDispatch } from "../../store/store"
import { formatCart } from "../../utils/format/formatCart"
import { printTicket } from "../../utils/print/printTicket"
import { setOrderType, setPaymentMethod } from "../../store/ticket/ticketSlice"
import { useTicketContext } from "../../context/TicketContext"
import View from "./View"
import type { Cart, OrderTypes, PaymentOptions, Table, TicketDataType } from "../../types"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

// TODO handle openchekout with parameters in url instead?

const Controller = ({ setOpenCheckout }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector<RootState, Cart>(state => state.cart)
    const ticket = useSelector<RootState, TicketDataType>(state => state.ticket)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const ticketDomRef = useTicketContext()
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })
    const currentClient = currentTable ? currentTable.name : "Takeaway"
    const checkoutCart = currentTable ? currentTable.cart : cart
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handlePaymentMethod = (method: PaymentOptions) => {
        dispatch(setPaymentMethod(method))
    }

    const handleOrderType = (type: OrderTypes) => {
        dispatch(setOrderType(type))
    }

    const handleCheckout = async () => {

        setLoading(true)

        // Print before placing order, case fails it still prints and order can be created manually
        printTicket(ticketDomRef.current)

        // PLACE ORDER IN WOOCOMMERCE
        try {

            const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://lovely-burger-pos.diegoui.com.ar/api/new-local-order"

            const formattedCart = formatCart(checkoutCart)

            const orderData = {
                customer: currentTable ? currentClient : "Takeaway",
                payment_method: "Bank Transfer / Cash",
                products: formattedCart,
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            }

            const response = await fetch(newOrderUrl, options)

            const json = await response.json()

            if (json.result.data?.status === 400) {
                setError("An error ocurred placing order in Woocommerce")
            }

            currentTable ? dispatch(clearTableCart()) : dispatch(clearCart())
            setOpenCheckout(false)

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
            error={error}
            checkoutCart={checkoutCart}
            paymentMethod={ticket.paymentMethod}
            orderType={ticket.orderType}
            handlePaymentMethod={handlePaymentMethod}
            handleOrderType={handleOrderType}
            setOpenCheckout={setOpenCheckout}
            handleCheckout={handleCheckout}
        />
    )
}

export default Controller