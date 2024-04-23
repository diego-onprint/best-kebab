/*
The Dom Ref is stored in context.
The html to print can't be created when user wants to print because printing in Android uses RawBT and
in order to style the tiket we need to use an image in base64 already styled. The approach is to have a
Ticket component alway mounted and its data updated accordingly, always ready to be printed.

TODO
Styles in ticket are mix of Tailwind and custom classes in index.css. Correct this,
make it just tailwind
*/

import { Fragment, useEffect, useState } from "react"
import { formatPrice } from "../../utils/format/formatPrice"
import { useTicketContext } from "../../context/TicketContext"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useActiveOrder } from "../../hooks/useActiveOrder"

const SpecialKitchenTicket = () => {
    const { specialKitchenTicketDomRef } = useTicketContext()
    const order = useActiveOrder()
    const kitchenTicket = useSelector<RootState, []>(state => state.kitchenTicket)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 30000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        // FOR DEBUGGING DIV
        <div className="absolute bg-white w-[600px] p-4 bottom-[0px] -left-[0px]">
        {/* <div className="absolute bg-white w-[600px] p-4 -top-[800px] -left-[800px]"> */}
            <div className="max-w-[650px] px-6 py-4" ref={specialKitchenTicketDomRef}>
                <div className="logo-container">
                    <img className="logo" src="/assets/lovely-burger-ticket-logo.png" alt="" />
                </div>
                <div className="mb-4">
                    <p className="text-xl text-center mb-sm">Seuzachstrasse 2,</p>
                    <p className="text-xl text-center mb-sm">8413 Neftenbach</p>
                    <p className="text-xl text-center mb-sm">www.lovely-burger.ch</p>
                    <p className="text-xl text-center mb-sm">MWST CHE-166.937.519</p>
                </div>
                <p className="text-2xl font-bold mb-1 capitalize">Küche (Partial Ticket)</p>
                <p className="text-2xl font-bold mb-1 capitalize">{order.name}</p>
                <p className="mb-4">
                    <span className="text-xl font-bold">Bestelldatum: </span>
                    <span className="text-xl">{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
                </p>
                <table className="ticket-table">
                    <thead className="ticket-head">
                        <tr>
                            <th className="ticket-th th qty text-xl align-left">Q</th>
                            <th className="ticket-th th art text-xl align-left">Produkt</th>
                            <th className="ticket-th text-xl align-left">CHF</th>
                        </tr>
                    </thead>
                    <tbody className="ticket-body">
                        {
                            kitchenTicket.products.map(product => {
                                return (
                                    <Fragment key={product.uid}>
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
                <p className="text-xl mt-2">
                    <span className="font-semibold">Bemerkung: </span>
                    <span>{kitchenTicket.notes}</span>
                </p>
            </div>
        </div>
    )
}

export default SpecialKitchenTicket