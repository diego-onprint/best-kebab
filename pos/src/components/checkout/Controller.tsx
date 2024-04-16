import { Dispatch, SetStateAction, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../../store/cart/cartSlice"
import { clearTableCart } from "../../store/tables/tablesSlice"
import { calculatePercentage } from "../../utils/calculate/calculatePercentage"
import { RootState, AppDispatch } from "../../store/store"
import type { Cart, Table } from "../../types"
import View from "./View"
import { formatCart } from "../../utils/format/formatCart"
import { formatPrice } from "../../utils/format/formatPrice"
import { printTicket } from "../../utils/print/printTicket"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

// TODO handle openchekout with parameters in url instead?

const Controller = ({ setOpenCheckout }: PropsTypes) => {

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
    const ticketDomRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("Kasse")
    // Can be "delivery" (tax 2.5%), "takeaway" (tax 2.5%), or "onsite" (tax 8.1%)
    const [condition, setCondition] = useState("delivery")
    const tax = condition === "onsite" ? {
        rate: 8.1,
        total: calculatePercentage(checkoutCart.total, 8.1).toFixed(2)
    } : {
        rate: 2.5,
        total: calculatePercentage(checkoutCart.total, 2.6).toFixed(2),
    }

    const handlePrintTicket = () => {
        printTicket(ticketDomRef.current)
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
        <>
            <View
                loading={loading}
                error={error}
                checkoutCart={checkoutCart}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setOpenCheckout={setOpenCheckout}
                handlePrintTicket={handlePrintTicket}
                handleCheckout={handleCheckout}
                condition={condition}
                setCondition={setCondition}
            />

            {/* TICKET TO PRINT */}
            <div className="absolute -top-[800px] -right-[800px] bg-white w-[800px] p-4">
                <div className="max-w-[650px]" ref={ticketDomRef}>
                    <div className="logo-container">
                        <img className="logo" src="/assets/lovely-logo.jpg" alt="" />
                    </div>
                    <div>
                        <div>Seuzachstrasse 2,</div>
                        <div>8413 Neftenbach</div>
                        <div>www.lovely-burger.ch</div>
                        <div>MWST CHE-166.937.519</div>
                    </div>
                    <div style={{ "margin": "10px 0" }}>
                        <p>{currentClient}</p>
                        <p>Zahlung: {paymentMethod}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className="th qty text-sm align-left">Q</th>
                                <th className="th art text-sm align-left">Artikel</th>
                                <th className="text-sm align-left">CHF</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                checkoutCart.products.map(product => {

                                    console.log(product)
                                    return (
                                        <>
                                            <tr>
                                                <td rowSpan={product.variations.length + 1}>{product.qty}</td>
                                                <td className="text-md" style={{ "flex": 1 }}>
                                                    {product.name}
                                                    {product.notes.length > 0 ? product.notes : null}
                                                </td>
                                                <td className="text-md" style={{ "width": "55px" }}>{formatPrice((product.price * product.qty).toString())}</td>
                                            </tr>
                                            {
                                                product.variations.length > 0 ?
                                                    product.variations.map((variation) => {
                                                        return (
                                                            <tr key={variation.id}>
                                                                <td className="text-sm">{variation.name}</td>
                                                                <td className="text-sm">{formatPrice((variation.price).toString())}</td>
                                                            </tr>
                                                        )
                                                    }) : null
                                            }
                                        </>
                                    )
                                })
                            }
                            <tr>
                                <td rowSpan={3}></td>
                                <td>Rabatt</td>
                                <td className="text-md">0</td>
                            </tr>
                            <tr>
                                <td>Versandgebühr</td>
                                <td className="text-md">0</td>
                            </tr>
                            <tr>
                                <td className="emph">Gesamt</td>
                                <td className="emph">{checkoutCart.total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-md tax">
                        <div className="text-sm">MwSt. CHF. {tax.total} -{'>'} {tax.rate}% MwsT. inkl</div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Controller