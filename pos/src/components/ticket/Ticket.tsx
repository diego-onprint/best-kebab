// The Dom Ref is stored in context.
// The html to print can't be created when user wants to print because printing in Android uses RawBT and
// in order to style the tiket we need to use an image in base64 already styled. The approach is to have a
// Ticket component alway mounted and its data updated accordingly, always ready to be printed.

// Styles in ticket are mix of Tailwind and custom classes in index.css

import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { calculatePercentage } from "../../utils/calculate/calculatePercentage"
import { formatPrice } from "../../utils/format/formatPrice"
import type { TicketDataType } from "../../types"
import { useTicketContext } from "../../context/TicketContext"

const Ticket = () => {

    const ticketDomRef = useTicketContext()
    const ticket = useSelector<RootState, TicketDataType>(state => state.ticket)
    const cart = useSelector<RootState, Cart>(state => state.cart)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const currentTable = useSelector<RootState, Table>(state => {
        const tables = state.tables.tables
        const table = tables.find(table => table.id === activeTable)
        return table
    })
    const currentClient = currentTable ? currentTable.name : "Takeaway"
    const checkoutCart = currentTable ? currentTable.cart : cart
    const tax = ticket.orderType === "tisch" ? {
        rate: 8.1,
        total: calculatePercentage(checkoutCart.total, 8.1).toFixed(2)
    } : {
        rate: 2.5,
        total: calculatePercentage(checkoutCart.total, 2.6).toFixed(2),
    }
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 60000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="absolute bg-white w-[600px] p-4 -top-[800px] -left-[800px]">
            <div className="max-w-[650px] px-6" ref={ticketDomRef}>
                <div className="logo-container">
                    <img className="logo" src="/assets/lovely-burger-ticket-logo.png" alt="" />
                </div>
                <div className="mb-4">
                    <p className="text-xl text-center mb-sm">Seuzachstrasse 2,</p>
                    <p className="text-xl text-center mb-sm">8413 Neftenbach</p>
                    <p className="text-xl text-center mb-sm">www.lovely-burger.ch</p>
                    <p className="text-xl text-center mb-sm">MWST CHE-166.937.519</p>
                </div>
                <div className="mb-4">
                    <p className="">
                        <span className="text-xl font-bold">Bestelldatum: </span>
                        <span className="text-xl">{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
                    </p>
                    <p className="text-xl font-bold py-2 capitalize">{currentClient}</p>
                </div>
                <table className="ticket-table">
                    <thead className="ticket-head">
                        <tr>
                            <th className="ticket-th th qty text-xl align-left">Q</th>
                            <th className="ticket-th th art text-xl align-left">Artikel</th>
                            <th className="ticket-th text-xl align-left">CHF</th>
                        </tr>
                    </thead>
                    <tbody className="ticket-body">
                        {
                            checkoutCart.products.map(product => {
                                return (
                                    <Fragment key={product.id}>
                                        <tr>
                                            <td className="ticket-td qty-col" rowSpan={product.variations.length + 1}>
                                                <p className="absolute top-3 text-sm">{product.qty}</p>
                                            </td>
                                            <td className="ticket-td text-2xl" style={{ "flex": 1 }}>
                                                <p>{product.name}</p>
                                                {product.notes.length > 0 ? <p className="text-sm">Notes: {product.notes}</p> : null}
                                            </td>
                                            <td className="ticket-td text-2xl" style={{ "width": "55px" }}>{formatPrice((product.price * product.qty).toString())}</td>
                                        </tr>
                                        {
                                            product.variations.length > 0 ?
                                                product.variations.map((variation) => {
                                                    return (
                                                        <tr key={variation.id}>
                                                            <td className="ticket-td text-sm">{variation.name}</td>
                                                            <td className="ticket-td text-sm">{formatPrice((variation.price).toString())}</td>
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
                <div className="flex flex-col gap-1 mt-4">
                    <div className="flex justify-between">
                        <p className="text-xl">Rabatt</p>
                        <p className="text-xl">CHF0</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xl">Versandgebühr</p>
                        <p className="text-xl">CHF0</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-2xl emph">Gesamt</p>
                        <p className="text-2xl emph">CHF{checkoutCart.total}</p>
                    </div>
                    <p className="text-sm">MwSt. CHF. {tax.total} -{'>'} {tax.rate}% MwsT. inkl</p>
                    <p className="text-2xl">
                        <span className="text-xl font-bold">Zahlung: </span>
                        <span className="capitalize">{ticket.paymentMethod}</span>
                    </p>
                </div>
            </div >
        </div>
    )
}

export default Ticket