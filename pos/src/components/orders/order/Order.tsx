import { useState } from "react"
import { formatDate } from "../../../utils/format/formatDate"
import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"

const Order = ({ order }) => {

    const [open, setOpen] = useState(false)

    console.log(order)

    return (
        <tr>
            <td onClick={() => setOpen(!open)} className="col-span-1 grid grid-cols-12 gap-4 py-5 cursor-pointer">
                <div className="font-semibold col-span-2">#{formatOrderNumber(order.order_id)}</div>
                <div className="col-span-3 overflow-hidden whitespace-nowrap text-ellipsis w-[85%]">{order.order_data.order_name}</div>
                <div className="col-span-2">{formatDate(order.order_data.date_created)}</div>
                <div className="col-span-2">{order.order_data.status.name}</div>
                <div className="col-span-2">CHF. {order.order_data.cart.total}</div>
                <div>
                    <button>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                </div>
            </td>
            {
                open ?
                    <td className="grid grid-cols-12 pb-4">
                        <dl className="col-start-2 col-span-11 flex flex-col gap-1 bg-zinc-50 p-4 rounded-lg">
                            <div className="flex gap-3">
                                <dt className="font-semibold">Payment Method:</dt>
                                <dd>{order.order_data.customer.paymentMethod?.name}</dd>
                            </div>
                            <div className="bg-white p-5 rounded-md mt-2">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-zinc-300 p-3 text-left">Q</th>
                                            <th className="border border-zinc-300 p-3 text-left">Artikel</th>
                                            <th className="border border-zinc-300 p-3 text-left">CHF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.order_data.cart.products.map(product => {
                                                return (
                                                    <>
                                                        <tr key={product.product_uid}>
                                                            <td className="border border-zinc-300 p-3">{product.product_qty}</td>
                                                            <td className="border border-zinc-300 p-3" style={{ "flex": 1 }}>
                                                                {product.product_name}
                                                            </td>
                                                            <td className="border border-zinc-300 p-3" style={{ "width": "55px" }}>{product.product_price * product.product_qty}</td>
                                                        </tr>
                                                        {/* {
                                                            product.product_variations.length > 0 ?
                                                                variation.value.map((variation) => {
                                                                    return (
                                                                        <tr key={variation.id}>
                                                                            <td className="border border-zinc-300 p-3 text-xs"></td>
                                                                            <td className="border border-zinc-300 p-3 text-xs">{variation.value}</td>
                                                                            <td className="border border-zinc-300 p-3 text-xs"> - </td>
                                                                        </tr>
                                                                    )
                                                                }) : null
                                                        } */}
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </dl>
                    </td> : null
            }
        </tr>
    )
}

export default Order