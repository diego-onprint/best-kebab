import { useState } from "react"
import Order from "../order/Order"
import Spinner from "../../common/spinner/Spinner"
import { useGetCompletedOrdersByPageQuery } from "../../../store/api/apiSlice"
import Pagination from "../../common/pagination/Pagination"

const OrdersList = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const { data, error, isFetching } = useGetCompletedOrdersByPageQuery({ page: currentPage, limit: 10 })
    const orders = data?.results

    //case not found -404- or sorts
    if (error) throw Error

    return (
        <div>
            <div className="flex justify-end">
                <Pagination
                    page={currentPage}
                    setPage={setCurrentPage}
                    hasNextPage={true}
                    loading={isFetching}
                />
            </div>
            <div className="relative bg-white shadow-md rounded-md my-4 min-h-[30rem]">
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
                                {orders.map(order => <Order order={order} key={order.id} />)}
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