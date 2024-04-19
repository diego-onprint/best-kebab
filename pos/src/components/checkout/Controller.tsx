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
import { CustomerData } from "../../models/customer_data"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

// TODO handle openchekout with parameters in url instead?

const Controller = ({ setOpenCheckout }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector<RootState, Cart>(state => state.cart)
    const ticket = useSelector<RootState, TicketDataType>(state => state.ticket)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const { ticketDomRef, customerData, setCustomerData, setOrderNumber } = useTicketContext()
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })
    const currentClient = currentTable ? currentTable.name : "Takeaway"
    const checkoutCart = currentTable ? currentTable.cart : cart
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleForm = (e) => {
        const { name, value } = e.target
        setCustomerData({
            ...customerData,
            [name]: value
        })
    }

    const handleCancel = () => {
        setOpenCheckout(false)
        setCustomerData(CustomerData)
        dispatch(setOrderType({name: "Lieferung", value: "delivery"}))
    }

    const handlePaymentMethod = (method: TicketDataType["paymentMethod"]) => {
        dispatch(setPaymentMethod(method))
    }

    const handleOrderType = (type: TicketDataType["orderType"]) => {
        dispatch(setOrderType(type))
    }

    const handleCheckout = async () => {

        setLoading(true)

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

            console.log("JSON", json)

            // currentTable ? dispatch(clearTableCart()) : dispatch(clearCart())
            setOrderNumber(json.result.number)
            setTimeout(() => {
                printTicket(ticketDomRef.current)
                setOrderNumber("")
            }, 500)
            setOpenCheckout(false)

        } catch (err) {

            console.error(err)
            setError("An error ocurred placing order in Woocommerce")

        } finally {

            setLoading(false)
        }
    }

    // If it is a table set customer data automatically
    useEffect(() => {
        if (currentTable) {
            dispatch(setOrderType({ name: "Tisch", value: "tisch" }))
        }
    }, [currentTable, dispatch])

    return (
        <View
            loading={loading}
            error={error}
            checkoutCart={checkoutCart}
            paymentMethod={ticket.paymentMethod}
            orderType={ticket.orderType}
            handlePaymentMethod={handlePaymentMethod}
            handleOrderType={handleOrderType}
            handleForm={handleForm}
            handleCancel={handleCancel}
            handleCheckout={handleCheckout}
        />
    )
}

export default Controller