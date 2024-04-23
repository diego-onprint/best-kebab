import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { removeOrder, setCurrentOrder } from '../../../store/orders/ordersSlice'
import { useActiveOrder } from '../../../hooks/useActiveOrder'

const Order = ({ order }) => {

    const dispatch = useDispatch<AppDispatch>()
    const activeOrder = useActiveOrder()
    const [open, setOpen] = useState(false)

    const handleSelect = () => {
        !open ? dispatch(setCurrentOrder(order.id)) : dispatch(setCurrentOrder(-1)) 
    }

    const handleRemove = (e) => {
        e.stopPropagation()
        dispatch(removeOrder(order.id))
        dispatch(setCurrentOrder(-1))
    }

    useEffect(() => {

        activeOrder.id === order.id ? setOpen(true) : setOpen(false)

    }, [activeOrder, order.id])

    return (
        <tr>
            <td onClick={handleSelect} className="col-span-1 grid grid-cols-12 gap-2 py-5 cursor-pointer">
                <div className="col-span-11 grid grid-cols-11">
                    <div className="col-span-2 font-semibold">{order.name}</div>
                    <div className="col-span-2 overflow-hidden whitespace-nowrap text-ellipsis w-[85%]">{order.customerData.name} {order.customerData.surname}</div>
                    <div className="col-span-2">Pending</div>
                    <div className="col-span-2">CHF. {order.cart.total}</div>
                </div>
                <button onClick={handleRemove}>
                    <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                    </svg>
                </button>
                {/* <button onClick={handleSelect}>{open ? "Close" : "Select"}</button> */}
            </td>
            {
                open ?
                    <td className="grid grid-cols-12 pb-4">
                        <dl className="col-start-2 col-span-10 flex flex-col gap-1 bg-zinc-50 p-4 rounded-lg">
                            <div className="flex gap-3">
                                <dt className="font-semibold">Address:</dt>
                                <dd>{order.customerData.address}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="font-semibold">Phone:</dt>
                                <dd>{order.customerData.phone}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="font-semibold">Email:</dt>
                                <dd>{order.customerData.email}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="font-semibold">Type:</dt>
                                <dd>{order.customerData.orderType.name}</dd>
                            </div>
                        </dl>
                    </td> : null
            }
        </tr>
    )
}

export default Order