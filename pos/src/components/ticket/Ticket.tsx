/*
Layout has style with print media to hide everything on print.
This component is not reached by the print media query, so it is printed on window.print()
*/

import { Fragment, useEffect, useState } from "react"
import { calculatePercentage } from "../../utils/calculate/calculatePercentage"
import { formatPrice } from "../../utils/format/formatPrice"
import { useTicketContext } from "../../context/TicketContext"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import type { Order } from "../../types"
import useIsAndroid from "../../hooks/useIsAndroid"

const TAX_RATE = 8.1

const Ticket = () => {

    const { isAndroid } = useIsAndroid()
    const { ticket, shopTicketDomRef } = useTicketContext()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const [date, setDate] = useState(new Date())

    const show = () => {
        if (isAndroid) return true
        if (ticket === "client" || ticket === "shop") return true
        return false
    } 
        
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 30000)

        return () => clearInterval(intervalId)
    }, [])

    if (currentOrder.data) {
        return (
            <div className={`absolute bg-white w-full py-4 top-0 left-0 -z-50 ${show() ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-2 px-2 py-4" ref={shopTicketDomRef}>
                    <div className="w-full flex items-center justify-center">
                        <img className="w-[250px] h-[130px] object-contain" src="/assets/logo.jpg" alt="" />
                        {/* <h2 className="font-bold text-3xl">Ceviche</h2> */}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="to-print text-xl text-center">Seeplatz 4,</p>
                        <p className="to-print text-xl text-center">8820 Wädenswil</p>
                        <p className="to-print text-xl text-center">MwsT CHE-303.412.027</p>
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
                                <th className="border border-zinc-400 p-2 th w-[10px] text-left">Q</th>
                                <th className="border border-zinc-400 p-2 th flex-1 text-left">Produkt</th>
                                <th className="border border-zinc-400 p-2 text-left">CHF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentOrder.data.cart.products.map(product => {
                                    return (
                                        <Fragment key={product.product_uid}>
                                            <tr>
                                                <td className="border border-zinc-400 p-2 relative" rowSpan={1}>
                                                    <p className="absolute top-[8px] text-md">{product.product_qty}</p>
                                                </td>
                                                <td className="border border-zinc-400 p-2 text-md" style={{ "flex": 1 }}>
                                                    <p>{product.product_name}</p>
                                                    {product.product_notes.length > 0 ? <p className="text-sm">Notes: {product.product_notes}</p> : null}
                                                </td>
                                                <td className="border border-zinc-400 p-2 text-md w-12">{formatPrice((product.product_price * product.product_qty).toString())}</td>
                                            </tr>
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        Object.entries(currentOrder.data?.customerData).length !== 0 ?
                            <p className="text-xl mt-2">
                                <span className="font-semibold">Bemerkung: </span>
                                {/* <span>{order.customerData.notes}</span> */}
                            </p> : null
                    }
                    <div className="flex flex-col gap-1 mt-2">
                        <div className="flex justify-between">
                            <p className="text-2xl font-bold">Gesamt</p>
                            <p className="text-2xl font-bold">CHF{currentOrder.data.cart.total}</p>
                        </div>
                        <p>
                            MwSt. CHF. {calculatePercentage(currentOrder.data.cart.total, TAX_RATE).toFixed(2)} -{'>'} {TAX_RATE}% MwsT. inkl  
                        </p>
                        {
                            Object.entries(currentOrder.data?.customerData).length !== 0 ?
                            <p className="text-xl mt-2">
                                <span className="font-semibold">Zahlung: </span>
                                <span>{currentOrder.data.customerData.paymentMethod?.name}</span>
                            </p> : null
                        }
                    </div>
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

export default Ticket