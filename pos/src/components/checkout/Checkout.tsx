import { Dispatch, SetStateAction, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Calculator from "./calculator/Calculator"
import Spinner from "../common/spinner/Spinner"
import { clearCart } from "../../store/cart/cartSlice"
import { clearTableCart } from "../../store/tables/tablesSlice"
import { calculatePercentage } from "../../utils/calculatePercentage"
import { createCheckoutTicketHtml } from "../../utils/createCheckoutTicketHtml"
import { createPrintOnlyTicketHtml } from "../../utils/createPrintOnlyTicketHtml"
import { RootState, AppDispatch } from "../../store/store"
import type { Cart, Table } from "../../types"
import { printHtml } from "../../utils/print/printHtml"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

const Checkout = ({ setOpenCheckout }: PropsTypes) => {

    const windowRef = useRef(window)
    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector<RootState, Cart>(state => state.cart)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })
    const currentClient = currentTable ? currentTable.name : "Takeaway"
    const checkoutCart = currentTable ? currentTable.cart : cart
    const tax = currentTable ? {
        rate: 8.1,
        total: calculatePercentage(checkoutCart.total, 8.1).toFixed(2)
    } : {
        rate: 2.6,
        total: calculatePercentage(checkoutCart.total, 2.6).toFixed(2),
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("Kasse")

    const printTicket = () => {
        const ticketHtml = createPrintOnlyTicketHtml(checkoutCart, tax, currentClient, paymentMethod)
        printHtml("to-print", ticketHtml)
    }

    const handleCheckout = async () => {

        setLoading(true)

        const printCheckoutTicket = () => {
            const ticketHtml = createCheckoutTicketHtml(checkoutCart, tax, currentClient, paymentMethod)
            printHtml("to-print", ticketHtml)
        }

        // PLACE ORDER IN WOOCOMMERCE
        try {

            const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://lovely-burger-pos.diegoui.com.ar/api/new-local-order"

            const parsedCart = checkoutCart.products.map(product => {

                //IF VARIATIONS, CALCULATE THE TOTAL - WOOCOMMERCE DOESNT ADD AUTOMATICALLY THE VARIATION PRICE TO THE TOTAL
                if (product.variations.length > 0) {

                    const variationsTotalPrice = product.variations.reduce((acc, curr) => {
                        return acc + curr.price
                    }, 0)

                    const variationsName = product.variations.map(variation => variation.name).join("/")

                    const productTotalPrice = (Number(product.price) + variationsTotalPrice) * product.qty

                    return {
                        name: product.name,
                        product_id: product.id,
                        meta_data: [
                            {
                                key: "Variations",
                                value: variationsName
                            },
                            {
                                key: "Notes",
                                value: product.notes
                            }],
                        quantity: product.qty,
                        total: productTotalPrice.toString()
                    }
                }

                return {
                    name: product.name,
                    product_id: product.id,
                    meta_data: [{ key: "Notes", value: product.notes }],
                    quantity: product.qty,
                    total: (Number(product.price) * product.qty).toString(),
                }
            })

            const orderData = {
                customer: currentTable ? currentClient : "Takeaway",
                payment_method: "Bank Transfer / Cash",
                products: parsedCart,
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

            // console.log(json)

            // MAYBE PARSE WOO RESPONSE TO SET TICKET?
            // printCheckoutTicket(json.result)
            printCheckoutTicket()

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
        <div className="grid place-items-center fixed inset-0 py-5 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md p-6 w-11/12 max-w-screen-2xl">
                <div className="col-span-3 flex flex-col gap-2 px-6">
                    <button onClick={() => setPaymentMethod("Kasse")} className={`button-base bg-zinc-200 ${paymentMethod === "Kasse" && "outline outline-green-400"}`}>Kasse</button>
                    <button onClick={() => setPaymentMethod("Kredikarte")} className={`button-base bg-zinc-200 ${paymentMethod === "Kredikarte" && "outline outline-green-400"}`}>Kredikarte</button>
                </div>
                <div className="col-span-9 px-4 flex flex-col gap-4">
                    <Calculator total={checkoutCart.total} />
                    <div className="grid grid-cols-12 gap-2">
                        <button onClick={() => setOpenCheckout(false)} disabled={loading} className="ghost-button col-span-3">Cancel</button>
                        <button onClick={printTicket} disabled={loading} className="ghost-button col-span-3">Print</button>
                        <button onClick={handleCheckout} disabled={loading} className="primary-button col-span-6">
                            {
                                loading ?
                                    <Spinner /> :
                                    "Checkout"
                            }
                        </button>
                        {error ? <p className="absolute bottom-0 text-red-500">{error}</p> : null}
                    </div>
                </div>
            </div>
            <div id="to-print">dsl;akjfldlaks</div>
        </div>
    )
}

export default Checkout