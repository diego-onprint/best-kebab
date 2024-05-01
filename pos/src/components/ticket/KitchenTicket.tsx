/*
Layout has style with print media to hide everything on print.
This component is not reached by the print media query, so it is printed on window.print()

TODO
Styles in ticket are mix of Tailwind and custom classes in index.css. Correct this,
make it just tailwind
*/

import { Fragment, useEffect, useState } from "react"
import { calculatePercentage } from "../../utils/calculate/calculatePercentage"
import { formatPrice } from "../../utils/format/formatPrice"
import { useTicketContext } from "../../context/TicketContext"
// import { useActiveOrder } from "../../hooks/useActiveOrder"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import type { Order } from "../../types"

const KithcenTicket = () => {

    const { ticket } = useTicketContext()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)

    return (
        <div className={`absolute bg-white w-[600px] p-4 top-0 left-0 -z-50 ${ticket === "kitchen" ? "block" : "hidden"}`}>
            <div className="max-w-[650px] px-6 py-4">
                <div className="logo-container">
                    {/* <img className="logo" src="/assets/lovely-burger-ticket-logo.png" alt="" /> */}
                    Kuche
                </div>
            </div>
        </div>
    )

    // const { ticketDomRef, wooOrderNumber } = useTicketContext()
    // const order = useActiveOrder()
    // const [date, setDate] = useState(new Date())
    // const tax = order.isTable ? {
    //     rate: 8.1,
    //     total: calculatePercentage(parseInt(order.cart.total), 8.1).toFixed(2)
    // } : {
    //     rate: 2.6,
    //     total: calculatePercentage(parseInt(order.cart.total), 2.6).toFixed(2),
    // }

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setDate(new Date())
    //     }, 60000)

    //     return () => clearInterval(intervalId)
    // }, [])

    // return (
    //     // <div className="absolute bg-white w-[600px] p-4 bottom-[0px] -left-[0px]">
    //      <div className="absolute bg-white w-[600px] p-4 -top-[800px] -left-[800px]">
    //         <div className="max-w-[650px] px-6 py-4" ref={ticketDomRef}>
    //             <div className="logo-container">
    //                 <img className="logo" src="/assets/lovely-burger-ticket-logo.png" alt="" />
    //             </div>
    //             <div className="mb-4">
    //                 <p className="text-xl text-center mb-sm">Seuzachstrasse 2,</p>
    //                 <p className="text-xl text-center mb-sm">8413 Neftenbach</p>
    //                 <p className="text-xl text-center mb-sm">www.lovely-burger.ch</p>
    //                 <p className="text-xl text-center mb-sm">MWST CHE-166.937.519</p>
    //             </div>
    //             <p>
    //                 <span className="text-xl font-bold">Bestellung: </span>
    //                 {
    //                     wooOrderNumber !== 0 ?
    //                     <span className="text-xl">#{wooOrderNumber}</span> :
    //                     <span className="text-xl">{order.name}</span>
    //                 }
    //             </p>
    //             <p>
    //                 <span className="text-xl font-bold">Bestelldatum: </span>
    //                 <span className="text-xl">{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
    //             </p>
    //             {
    //                 order.isTkw ?
    //                     <div className="mb-2">
    //                         <p className="text-xl font-bold">Kundendaten:</p>
    //                         {order.customerData.name.length > 0 ? <p className="text-xl">{order.customerData.name} {order.customerData.surname}</p> : null}
    //                         {order.customerData.address.length > 0 ? <p className="text-xl">{order.customerData.address}</p> : null}
    //                         {order.customerData.city.length > 0 ? <p className="text-xl">{order.customerData.city}, {order.customerData.postcode}</p> : null}
    //                         {order.customerData.phone.length > 0 ? <p className="text-xl">{order.customerData.phone}</p> : null}
    //                         {order.customerData.email.length > 0 ? <p className="text-xl">{order.customerData.email}</p> : null}
    //                     </div> : null
    //             }
    //             <table className="ticket-table">
    //                 <thead className="ticket-head">
    //                     <tr>
    //                         <th className="ticket-th th qty text-xl align-left">Q</th>
    //                         <th className="ticket-th th art text-xl align-left">Produkt</th>
    //                         <th className="ticket-th text-xl align-left">CHF</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody className="ticket-body">
    //                     {
    //                         order.cart.products.map(product => {
    //                             return (
    //                                 <Fragment key={product.uid}>
    //                                     <tr>
    //                                         <td className="ticket-td qty-col" rowSpan={product.variations.length + 1}>
    //                                             <p className="absolute top-3 text-sm">{product.qty}</p>
    //                                         </td>
    //                                         <td className="ticket-td text-2xl" style={{ "flex": 1 }}>
    //                                             <p>{product.name}</p>
    //                                             {product.notes.length > 0 ? <p className="text-sm">Notes: {product.notes}</p> : null}
    //                                         </td>
    //                                         <td className="ticket-td text-2xl" style={{ "width": "55px" }}>{formatPrice((product.price * product.qty).toString())}</td>
    //                                     </tr>
    //                                     {
    //                                         product.variations.length > 0 ?
    //                                             product.variations.map((variation) => {
    //                                                 return (
    //                                                     <tr key={variation.id}>
    //                                                         <td className="ticket-td text-sm">{variation.name}</td>
    //                                                         <td className="ticket-td text-sm">{formatPrice((variation.price).toString())}</td>
    //                                                     </tr>
    //                                                 )
    //                                             }) : null
    //                                     }
    //                                 </Fragment>
    //                             )
    //                         })
    //                     }
    //                 </tbody>
    //             </table>
    //             <p className="text-xl mt-2">
    //                 <span className="font-semibold">Bemerkung: </span>
    //                 <span>{order.customerData.notes}</span>
    //             </p>
    //             <div className="flex flex-col gap-1 mt-2">
    //                 <div className="flex justify-between">
    //                     <p className="text-xl">Versand</p>
    //                     <p className="text-xl">CHF0</p>
    //                 </div>
    //                 <div className="flex justify-between">
    //                     <p className="text-2xl emph">Gesamt</p>
    //                     <p className="text-2xl emph">CHF{order.cart.total}</p>
    //                 </div>
    //                 <p className="text-sm">MwSt. CHF. {tax.total} -{'>'} {tax.rate}% MwsT. inkl</p>
    //                 <p className="text-xl mt-2">
    //                     <span className="font-semibold">Zahlung: </span>
    //                     <span>{order.customerData.paymentMethod?.name}</span>
    //                 </p>
    //             </div>
    //         </div >
    //     </div>
    // )
}

export default KithcenTicket