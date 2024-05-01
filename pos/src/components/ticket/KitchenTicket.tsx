/*
Layout has style with print media to hide everything on print.
This component is not reached by the print media query, so it is printed on window.print()

TODO - exclude drinks based on categories
*/

import { Fragment, useEffect, useState } from "react"
import { formatPrice } from "../../utils/format/formatPrice"
import { useTicketContext } from "../../context/TicketContext"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import type { Order } from "../../types"

const KithcenTicket = () => {

    const { ticket } = useTicketContext()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 30000)

        return () => clearInterval(intervalId)
    }, [])

    if (currentOrder.data) {
        return (
            // <div className={`absolute bg-white w-[600px] p-4 top-0 left-0 z-[10000]`}>
            <div className={`absolute bg-white w-[600px] p-4 top-0 left-0 -z-50 ${ticket === "kitchen" ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-4 max-w-[650px] px-6 py-4">
                    <div className="w-full flex flex-col gap-2 items-center justify-center">
                        {/* <img className="w-[250px] h-[130px] object-contain" src="/assets/lovely-burger-ticket-logo.png" alt="" /> */}
                        <h2 className="font-bold text-3xl">Ceviche</h2>
                        <h2 className="font-bold text-2xl">Küche</h2>
                    </div>
                    <p>
                        <span className="text-xl font-bold">Bestellung: </span>
                        <span className="text-xl">{currentOrder.data.name}</span>
                    </p>
                    <p>
                        <span className="text-xl font-bold">Bestelldatum: </span>
                        <span className="text-xl">{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
                    </p>
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-zinc-400 p-2 th w-[10px] text-xl text-left">Q</th>
                                <th className="border border-zinc-400 p-2 th flex-1 text-xl text-left">Produkt</th>
                                <th className="border border-zinc-400 p-2 text-xl text-left">CHF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentOrder.data.cart.products.map(product => {
                                    return (
                                        <Fragment key={product.product_uid}>
                                            <tr>
                                                <td className="border border-zinc-400 p-2 relative" rowSpan={product.product_variations.length + 1}>
                                                    <p className="absolute top-[11px] text-xl">{product.product_qty}</p>
                                                </td>
                                                <td className="border border-zinc-400 p-2 text-2xl" style={{ "flex": 1 }}>
                                                    <p>{product.product_name}</p>
                                                    {product.product_notes.length > 0 ? <p className="text-sm">Notes: {product.product_notes}</p> : null}
                                                </td>
                                                <td className="border border-zinc-400 p-2 text-2xl w-12">{formatPrice((product.product_price * product.product_qty).toString())}</td>
                                            </tr>
                                            {
                                                product.product_variations.length > 0 ?
                                                    product.product_variations.map((variation) => {
                                                        return (
                                                            <tr key={variation.id}>
                                                                <td className="border border-zinc-400 p-2 text-sm">{variation.name}</td>
                                                                <td className="border border-zinc-400 p-2 text-sm">{formatPrice((variation.price).toString())}</td>
                                                            </tr>
                                                        )
                                                    }) : null
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className={`absolute bg-white w-[600px] p-4 top-0 left-0 -z-50 ${ticket === "client" ? "block" : "hidden"}`}>
            No order selected
        </div>
    )
}

export default KithcenTicket