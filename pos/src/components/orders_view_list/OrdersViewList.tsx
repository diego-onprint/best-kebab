import Spinner from "../common/spinner/Spinner"
import { useGetScreenOrdersQuery, useGetTakeawayOrdersDataQuery } from "../../store/api/apiSlice"
import { useEffect, useState } from "react"
import { formatOrderNumber } from "../../utils/format/formatOrderNumber"
import socket from "../../socket"

const OrdersViewList = () => {

    const { data: orders, error, isFetching, refetch } = useGetScreenOrdersQuery()
    const [completedOrders, setCompletedOrders] = useState([])
    const [inProcessOrders, setInProcessOrders] = useState([])

    if (error) console.log(error)

    useEffect(() => {

        if (orders) {
            const filteredCompleted = orders.filter(order => order.status.value === "ready")
            const filteredInProcess = orders.filter(order => order.status.value === "process")

            setCompletedOrders(filteredCompleted)
            setInProcessOrders(filteredInProcess)
        }

    }, [orders])

    useEffect(() => {
        // Listen for server events
        socket.on('update-order-view', () => {
            console.log("UPDATED HERE!")
            refetch()
        });

        // const timer = setTimeout(() => {
        //     refetch()
        // }, 5000);

        // Cleanup on unmount
        return () => {
            // clearTimeout(timer)
            socket.off('update-order-view')
        };
    }, []);

    return (
        <div className="relative h-full flex gap-3">
            {
                !isFetching ?
                    <>
                        <table className="w-full bg-white shadow-md rounded-md my-4 text-4xl">
                            <thead className="shadow-md shadow-slate-100">
                                <tr>
                                    <td className="px-8 py-2 text-3xl text-yellow-500 font-semibold">Preparing...</td>
                                </tr>
                            </thead>
                            <tbody className={`flex flex-wrap gap-4 p-4 first-line:selection:${isFetching && "opacity-45"}`}>
                                {
                                    inProcessOrders.map(order => {
                                        return (
                                            <tr key={order.id} className="font-semibold col-span-2 p-3 border border-zinc-100 rounded-md shadow-md shadow-slate-100">
                                                <td>#{formatOrderNumber(order.id)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <table className="w-full bg-white shadow-md rounded-md my-4 text-4xl">
                            <thead className="shadow-md shadow-slate-100">
                                <tr>
                                    <td className="px-8 py-2 text-3xl text-green-500 font-semibold">Ready to collect</td>
                                </tr>
                            </thead>
                            <tbody className={`flex flex-wrap gap-4 p-4 first-line:selection:${isFetching && "opacity-45"}`}>
                                {
                                    completedOrders.map(order => {
                                        return (
                                            <tr key={order.id} className="font-semibold col-span-2 p-3 border border-zinc-100 rounded-md shadow-md shadow-slate-100">
                                                <td>#{formatOrderNumber(order.id)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                    :
                    <div className="w-full h-60 grid place-items-center">
                        <Spinner color={"text-zinc-300"} />
                    </div>
            }
        </div>
    )
}

export default OrdersViewList