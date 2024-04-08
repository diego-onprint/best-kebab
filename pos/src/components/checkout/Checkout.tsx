import { Dispatch, SetStateAction, useRef, useState } from "react"
import { createLocalTicketHtml } from "../../utils/createLocalTicketHtml"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../../store/cart/cartSlice"
import Calculator from "./calculator/Calculator"
import Spinner from "../spinner/Spinner"
import { RootState, AppDispatch } from "../../store/store"
import type { Cart, Table } from "../../types"
import { createPrintOnlyTicketHtml } from "../../utils/createPrintOnlyTicketHtml"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

const Checkout = ({ setOpenCheckout }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector<RootState, Cart>(state => state.cart)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })

    const checkoutCart = currentTable ? currentTable.cart : cart

    const windowRef = useRef(window)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cash")

    const printLocalOrder = () => {
        const ticketHtml = createPrintOnlyTicketHtml(checkoutCart)

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

        console.log(checkoutCart.products)
        console.log("Cart", checkoutCart)

        let json

        const printCheckoutTicket = (content) => {
            // CREATE TICKET HTML
            const ticketHtml = createLocalTicketHtml(content)
   
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

        // PLACE ORDER IN WOOCOMMERCE
        try {

            const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://onprintpos.diegoui.com.ar/api/new-local-order"

            const parsedCart = checkoutCart.products.map(product => {

                if (product.variation) {

                    //CALCULATE THE TOTAL WHEN VARIATIONS - WOOCOMMERCE DOESNT ADD AUTOMATICALLY THE VARIATION PRICE TO THE TOTAL
                    const productTotal = Number(product.price) * product.qty + Number(product.variation.price)

                    return {
                        product_id: product.id,
                        variation_id: product.variation.id,
                        quantity: product.qty,
                        total: productTotal.toString()
                    }
                }

                return {
                    product_id: product.id,
                    quantity: product.qty
                }
            })

            const orderData = {
                customer: "Table 4",
                payment_method: "Bank Transfer / Cash",
                products: parsedCart,
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            }

            const response = await fetch(newOrderUrl, options)

            json = await response.json()

            if (json.result.data?.status === 400) {
                setError("An error ocurred placing order in Woocommerce")
            }

            // dispatch(clearCart())
            // setOpenCheckout(false)

        } catch (err) {

            console.error(err)
            setError("An error ocurred placing order in Woocommerce")

        } finally {

            setLoading(false)
        }

       printCheckoutTicket(json.result)
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