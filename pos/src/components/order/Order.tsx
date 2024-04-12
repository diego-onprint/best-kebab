import { useState } from "react"
import { formatDate } from "../../utils/formatDate"

const Order = ({ order }) => {

    const [open, setOpen] = useState(false)
    
    return (
        <tr>
            <td onClick={() => setOpen(!open)} className="col-span-1 grid grid-cols-12 gap-2 py-5 cursor-pointer">
                <td className="font-semibold">{order.number}</td>
                <td className="col-span-4 overflow-hidden whitespace-nowrap text-ellipsis w-[85%]">{order.billing.first_name}</td>
                <td className="col-span-2">{formatDate(order.date_created)}</td>
                <td className="col-span-2">{order.status}</td>
                <td className="col-span-2">CHF. {order.total}</td>
                <td>
                    <button>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                </td>
            </td>
            <td>
                {
                    open ?
                    <div>This is a div</div> : null
                }
            </td>
        </tr>
    )
}

export default Order