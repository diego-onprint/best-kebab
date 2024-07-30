/*
Layout has style with print media to hide everything on print.
This component is not reached by the print media query, so it is printed on window.print()
*/

import { Fragment, useEffect, useState } from "react"
import { calculatePercentage } from "../../utils/calculate/calculatePercentage"
import { useSelector } from "react-redux"
import { useGetCompletedOrderByIdQuery, useGetOrderDataByIdQuery } from "../../store/api/apiSlice"
import { formatOrderNumber } from "../../utils/format/formatOrderNumber"
import { getCartTotal } from "../../utils/get/getCartTotal"
import { type RootState } from "../../store/store"

const Ticket = () => {

    const ticketType = useSelector<RootState, TicketType>(state => state.ticket.type)
    const { currentOrderId, completedOrderToEditId } = useSelector(state => state.currentOrder)
    const { data: currentOrder, refetch } = useGetOrderDataByIdQuery(currentOrderId)
    const { data: completedOrderToEdit } = useGetCompletedOrderByIdQuery(completedOrderToEditId)
    const { type: orderType } = useSelector(state => state.orderType)
    const { method: paymentMethod } = useSelector(state => state.paymentMethod)
    const { products: selectedProducts } = useSelector(state => state.selectedProducts)
    const [date, setDate] = useState(new Date())
    const [ticketProducts, setTicketProducts] = useState([])
    const [ticketTotal, setTicketTotal] = useState(0)

    const order = completedOrderToEditId ? completedOrderToEdit : currentOrder

    const shop = ticketType === "shop"
    const kitchen = ticketType === "kitchen"
    const TAX_RATE = orderType.value === "lieferung" ? 2.6 : 8.1

    console.log(order)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 30000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {

        if (order) {
            setTicketProducts(order.cart.products)
            setTicketTotal(order.cart.total.toFixed(2))
        }

        refetch()

    }, [order, refetch])

    useEffect(() => {

        if (selectedProducts.length > 0) {
            const selectedCartProducts = order.cart.products.filter(product => selectedProducts.includes(product.uid))
            const selectedCartTotal = getCartTotal(selectedCartProducts)
            setTicketProducts(selectedCartProducts)
            setTicketTotal(selectedCartTotal.toFixed(2))
        }

        if (order && selectedProducts <= 0) {
            setTicketProducts(order.cart.products)
            setTicketTotal(order.cart.total.toFixed(2))
        }

    }, [selectedProducts, order])

    if (order) {
        return (
            <div id="shop-ticket" className="fixed max-w-[800px] bg-white w-full py-4 top-0 left-0 -z-50 block">
                <div className="flex flex-col px-2 py-2 text-sm">
                    {
                        shop ?
                            <div>
                                <div className="w-full flex items-center justify-center">
                                    <img className="w-[200px] h-[100px] object-contain" src="/assets/ticket-logo.png" alt="" />
                                </div>
                                <div className="flex flex-col my-1">
                                    <p className="to-print text-center">Dohlenweg 24,</p>
                                    <p className="to-print text-center">8050 Zürich</p>
                                    <p className="to-print text-center">Tel. 0800 848 832</p>
                                    <p className="to-print text-center">www.smart-pos.ch</p>
                                </div>
                            </div> : null
                    }
                    {
                        kitchen ?
                            <div className="w-full flex items-center justify-center">
                                <h2 className="text-2xl">Smart Pos - Küche</h2>
                            </div> : null
                    }
                    <p>
                        <span className="font-bold">Bestellung: </span>
                        <span className="">{order.is_table ? order.name : `#${formatOrderNumber(order.id)}`}</span>
                    </p>
                    {
                        order.details.table !== "null" ?
                            <p>
                                <span className="font-bold">Tisch: </span>
                                <span>{order.details.table}</span>
                            </p> : null
                    }
                    <p>
                        <span className="font-bold">Bestelldatum: </span>
                        <span>{date.toLocaleDateString()}, {date.toLocaleTimeString()}</span>
                    </p>
                    {
                        shop && order.details && order.details.customer_data ?
                            <div className="w-full">
                                <div className="font-bold">
                                    <p>{order.details.order_type.name}</p>
                                    {order.details.delivery_time ? <p>{order.details.delivery_time}</p> : null}
                                </div>
                                <p className="font-bold">Kundendaten:</p>
                                <p>{order.details.customer_data.name} {order.details.customer_data.surname}</p>
                                {order.details.customer_data.address.length > 0 ? <p>{order.details.customer_data.address}</p> : null}
                                {order.details.customer_data.city.length > 0 ? <p>{order.details.customer_data.city}</p> : null}
                                {order.details.customer_data.postcode.length > 0 ? <p>{order.details.customer_data.postcode}</p> : null}
                                {order.details.customer_data.email.length > 0 ? <p>{order.details.customer_data.email}</p> : null}
                                {order.details.customer_data.phone.length > 0 ? <p>{order.details.customer_data.phone}</p> : null}
                                {order.details.customer_data.notes.length > 0 ? <p>{order.details.customer_data.notes}</p> : null}
                            </div> : null
                    }
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-zinc-400 p-1 th w-[10px] text-left">Q</th>
                                <th className="border border-zinc-400 p-1 th flex-1 text-left">Produkt</th>
                                {shop ? <th className="border border-zinc-400 p-1 text-left">CHF</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ticketProducts.map(product => {
                                    return (
                                        <Fragment key={product.uid}>
                                            <tr>
                                                <td className="border border-zinc-400 p-1 relative" rowSpan={product.variations.length + 1}>
                                                    <p className="absolute top-[8px] text-md">{product.qty}</p>
                                                </td>
                                                <td className="border border-zinc-400 p-1 text-md" style={{ "flex": 1 }}>
                                                    <p>{product.name}</p>
                                                    {product?.notes?.length > 0 ? <p className="text-sm">Notes: {product.notes}</p> : null}
                                                </td>
                                                {shop ? <td className="border border-zinc-400 p-1 text-md w-12">{product.total.toFixed(2)}</td> : null}
                                            </tr>
                                            {
                                                product.variations.length > 0 ?
                                                    product.variations.map((option) => {
                                                        return (
                                                            <tr key={option.option_id}>
                                                                <td className="border border-zinc-400 p-1 text-sm">{option.option_name}</td>
                                                                {shop ? <td className="border border-zinc-400 p-2 text-sm">{(option.option_price * product.qty).toFixed(2)}</td> : null}
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
                    {
                        shop ?
                            <div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex justify-between">
                                        <p className="text-base font-bold">Gesamt</p>
                                        <p className="text-base font-bold">CHF {ticketTotal}</p>
                                    </div>
                                    <p>
                                        MwSt. CHF. {calculatePercentage(parseInt(ticketTotal), TAX_RATE).toFixed(2)} -{'>'} {TAX_RATE}% MwsT. inkl
                                    </p>
                                    <p><span className="font-bold">Zahlung: </span>{paymentMethod.name}</p>
                                </div>
                            </div> : null
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="absolute bg-white w-[600px] p-4 top-0 left-0 -z-50 block">
            No order selected
        </div>
    )
}

export default Ticket