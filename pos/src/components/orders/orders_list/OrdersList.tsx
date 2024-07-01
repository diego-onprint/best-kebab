import { useEffect, useState } from "react"
import Order from "../order/Order"
import Spinner from "../../common/spinner/Spinner"
import { useGetCompletedOrdersByPageQuery } from "../../../store/api/apiSlice"
import Pagination from "../../common/pagination/Pagination"

// TODO UI to change limit
// TODO refactor paginations ui limitations using next and prev on data returned by query

const OrdersList = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [ordersToShow, setOrdersToShow] = useState("completed")
    const { data, error, isFetching, refetch } = useGetCompletedOrdersByPageQuery({ page: currentPage, limit: 10, status: ordersToShow })

    useEffect(() => {
        setCurrentPage(1)
    }, [ordersToShow])

    //case not found -404- or sorts
    if (error) throw Error

    return (
        <div>
            <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                    <button onClick={() => setOrdersToShow("completed")} className={`${ordersToShow === "completed" && "bg-blue-500 text-white border-blue-500"} px-2 py-1 text-xs rounded-sm`}>Completed</button>
                    <button onClick={() => setOrdersToShow("deleted")} className={`${ordersToShow === "deleted" && "bg-blue-500 text-white border-blue-500"} px-2 py-1 text-xs rounded-sm`}>Deleted</button>
                </div>
                <Pagination
                    page={currentPage}
                    setPage={setCurrentPage}
                    hasNextPage={data?.next}
                    hasPrevPage={data?.prev}
                    loading={isFetching}
                />
            </div>
            <div className="relative bg-white shadow-md rounded-md my-2 min-h-[30rem]">
                {
                    !isFetching ?
                        <table className="w-full">
                            <thead className="sticky -top-6 grid grid-cols-12 gap-2 bg-white p-4 shadow-md shadow-slate-100 text-sm">
                                <tr className="col-span-2"><td>Order</td></tr>
                                <tr className="col-span-2"><td>Customer</td></tr>
                                <tr className="col-span-3"><td>Date</td></tr>
                                <tr className="col-span-2"><td>Status</td></tr>
                                <tr className="col-span-2"><td>Total</td></tr>
                            </thead>
                            <tbody className={`flex flex-col divide-y divide-slate-200 px-4 first-line:selection:${isFetching && "opacity-45"}`}>
                                {
                                    data.results.map(order => {
                                        return (
                                            <Order order={order} key={order.id} refetch={refetch} ordersToShow={ordersToShow} />
                                        )
                                    })
                                }
                            </tbody>
                        </table> :
                        <div className="w-full h-60 grid place-items-center">
                            <Spinner color={"text-zinc-300"} />
                        </div>
                }
            </div>
        </div>
    )
}

export default OrdersList