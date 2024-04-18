import { useState } from "react"
import { formatDate } from "../../../utils/format/formatDate"

const Order = ({ order }) => {

    const [open, setOpen] = useState(false)

    console.log(order)

    return (
        <tr>
            <td onClick={() => setOpen(!open)} className="col-span-1 grid grid-cols-12 gap-2 py-5 cursor-pointer">
                <div className="font-semibold">{order.number}</div>
                <div className="col-span-4 overflow-hidden whitespace-nowrap text-ellipsis w-[85%]">{order.billing.first_name} {order.billing.last_name}</div>
                <div className="col-span-2">{formatDate(order.date_created)}</div>
                <div className="col-span-2">{order.status}</div>
                <div className="col-span-2">CHF. {order.total}</div>
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
                        <dl className="col-start-2 col-span-10 flex flex-col gap-1 bg-zinc-50 p-4 rounded-lg">
                            <div className="flex gap-3">
                                <dt className="font-semibold">Address:</dt>
                                <dd>{order.billing.address_1} {order.billing.address_2}, {order.billing.city}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="font-semibold">Phone:</dt>
                                <dd>{order.billing.phone}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="font-semibold">Email:</dt>
                                <dd>{order.billing.email}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="font-semibold">Payment Method:</dt>
                                <dd>{order.payment_method_title}</dd>
                            </div>
                            {
                                order.meta_data.length > 0 ?
                                <div className="flex gap-3">
                                    <dt className="font-semibold">Delivery time:</dt>
                                    <dd>{order.meta_data.find(data => data.key === "billing_deliverytime").value}</dd>
                                </div> : null
                            }
                            {
                                order.meta_data.find(data => data.key === "billing_deliverytimeoption") ?
                                <div className="flex gap-3">
                                    <dt className="font-semibold">Delivery mode:</dt>
                                    <dd>{order.meta_data.find(data => data.key === "billing_deliverytimeoption").value}</dd>
                                </div> : null
                            }
                            <div className="bg-white p-5 rounded-md mt-2">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-zinc-300 p-3 text-left">Q</th>
                                            <th className="border border-zinc-300 p-3 text-left">Artikel</th>
                                            <th className="border border-zinc-300 p-3 text-left">CHF</th>
                                        </tr>
                                    </thead>
                                    <tbody className="ticket-body">
                                        {
                                            order.line_items.map(product => {

                                                const variation = product.meta_data.find(item => item.key === "_tmcartepo_data")

                                                return (
                                                    <>
                                                        <tr key={product.id}>
                                                            <td className="border border-zinc-300 p-3">{product.quantity}</td>
                                                            <td className="border border-zinc-300 p-3" style={{ "flex": 1 }}>
                                                                {product.name}
                                                            </td>
                                                            <td className="border border-zinc-300 p-3" style={{ "width": "55px" }}>{product.price * product.quantity}</td>
                                                        </tr>
                                                        {
                                                            variation ?
                                                                variation.value.map((variation) => {
                                                                    return (
                                                                        <tr key={variation.id}>
                                                                            <td className="border border-zinc-300 p-3 text-xs"></td>
                                                                            <td className="border border-zinc-300 p-3 text-xs">{variation.value}</td>
                                                                            <td className="border border-zinc-300 p-3 text-xs"> - </td>
                                                                        </tr>
                                                                    )
                                                                }) : null
                                                        }
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