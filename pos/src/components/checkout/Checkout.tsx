import { Dispatch, SetStateAction, useRef, useState } from "react"
import { createLocalTicketHtml } from "../../utils/createLocalTicketHtml"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../../store/cart/cartSlice"
import { clearTableCart } from "../../store/tables/tablesSlice"
import Calculator from "./calculator/Calculator"
import Spinner from "../spinner/Spinner"
import { RootState, AppDispatch } from "../../store/store"
import type { Cart, Table } from "../../types"
import { createPrintOnlyTicketHtml } from "../../utils/createPrintOnlyTicketHtml"
import { calculatePercentage } from "../../utils/calculatePercentage"

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

    console.log(currentTable)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cash")

    const printLocalOrder = () => {
        const ticketHtml = createPrintOnlyTicketHtml(checkoutCart, tax, currentClient)

        // USE THE COMMENTED WHEN --KIOSK-PRINTING IN CHROME
        // const printWindow = windowRef.current.open(undefined, undefined, "width=50, height=50")
        const printWindow = windowRef.current.open("")

        if (printWindow && ticketHtml) {
            printWindow.document.write(ticketHtml)
            printWindow.document.close()
            printWindow.print()
            printWindow.close()
        } else {
            console.error("Ocurrió un error al intentar imprimir la ventana")
        }
    }

    const handleCheckout = async () => {

        setLoading(true)

        const printCheckoutTicket = (content) => {
            // CREATE TICKET HTML
            const ticketHtml = createLocalTicketHtml(content, tax, currentClient)

            const printWindow = windowRef.current.open("")

            if (printWindow && ticketHtml) {
                printWindow.document.write(ticketHtml)
                printWindow.document.close()
                printWindow.print()
                printWindow.close()
            } else {
                console.error("Ocurrió un error al intentar imprimir la ventana")
            }
        }

        console.log(checkoutCart)

        // PLACE ORDER IN WOOCOMMERCE
        try {

            const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://onprintpos.diegoui.com.ar/api/new-local-order"

            const parsedCart = checkoutCart.products.map(product => {

                //IF VARIATIONS, CALCULATE THE TOTAL - WOOCOMMERCE DOESNT ADD AUTOMATICALLY THE VARIATION PRICE TO THE TOTAL
                if (product.variations.length > 0) {

                    const variationsTotalPrice = product.variations.reduce((acc, curr) => {
                        return acc + Number(curr.price)
                    }, 0)

                    const variationsName = product.variations.map(variation => variation.name).join("/")

                    const productTotalPrice = Number(product.price) * product.qty + variationsTotalPrice

                    console.log("total price", productTotalPrice)

                    return {
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
                    meta_data: [{ key: "Notes", value: product.notes }],
                    product_id: product.id,
                    quantity: product.qty
                }
            })

            const orderData = {
                customer: currentTable ? "table" : "Takeaway",
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

            currentTable ? dispatch(clearTableCart()) : dispatch(clearCart())
            setOpenCheckout(false)
            printCheckoutTicket(json.result)

        } catch (err) {

            console.error(err)
            setError("An error ocurred placing order in Woocommerce")

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className="grid place-items-center fixed inset-0 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md p-6 w-11/12 max-w-3xl">
                <div className="col-span-3 flex flex-col gap-2 px-6">
                    <button onClick={() => setPaymentMethod("cash")} className={`button-base bg-zinc-200 ${paymentMethod === "cash" && "outline outline-green-400"}`}>Kasse</button>
                    <button onClick={() => setPaymentMethod("credit")} className={`button-base bg-zinc-200 ${paymentMethod === "credit" && "outline outline-green-400"}`}>Kredikarte</button>
                </div>
                <div className="col-span-9 px-4 flex flex-col gap-4">
                    <div className="flex justify-between bg-zinc-100 rounded-md p-6">
                        <div className="text-xl font-semibold">Total</div>
                        <div className="text-xl font-semibold">{checkoutCart.total}</div>
                    </div>
                    <Calculator total={checkoutCart.total} />
                    <div className="grid grid-cols-12 gap-2">
                        <button onClick={() => setOpenCheckout(false)} disabled={loading} className="ghost-button col-span-3">Cancel</button>
                        <button onClick={printLocalOrder} disabled={loading} className="ghost-button col-span-3">Print</button>
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
        </div>
    )
}

export default Checkout