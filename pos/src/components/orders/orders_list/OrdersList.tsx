import Order from "../order/Order"
import Spinner from "../../common/spinner/Spinner"
import { useGetOrdersByPageQuery } from "../../../store/api/apiSlice"
import Pagination from "../../common/pagination/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { setOrdersCondition, setOrdersPage } from "../../../store/orders_page/ordersPageSlice"

const OrdersList = () => {

    const dispatch = useDispatch()
    const { page: currentPage, limit, condition } = useSelector(state => state.ordersPage)
    const { data, error, isFetching } = useGetOrdersByPageQuery({ page: currentPage, limit, condition })
    const orders = data?.results

    console.log("COND....", condition)

    const handlePage = (value) => {
        dispatch(setOrdersPage(value))
    }

    const handleCondition = (value) => {
        dispatch(setOrdersCondition(value))
    }

    if (error) throw Error

    return (
        <div className="mt-3">
            <div className="flex justify-between items-center">
                <div className="space-x-2">
                    <button
                     onClick={() => handleCondition("all")}
                     className={`${condition === "all" ? "border-blue-500 bg-blue-500 text-white" : "bg-white border border-zinc-200"} rounded-full px-3 py-1 text-sm`}>
                        Alles
                     </button>
                    <button
                     onClick={() => handleCondition("process")}
                     className={`${condition === "process" ? "border-blue-500 bg-blue-500 text-white" : "bg-white border border-zinc-200"} rounded-full px-3 py-1 text-sm`}>
                        Process
                     </button>
                    <button
                     onClick={() => handleCondition("ready")}
                     className={`${condition === "ready" ? "border-blue-500 bg-blue-500 text-white" : "bg-white border border-zinc-200"} rounded-full px-3 py-1 text-sm`}>
                        Ready
                     </button>
                    <button
                     onClick={() => handleCondition("completed")}
                     className={`${condition === "completed" ? "border-blue-500 bg-blue-500 text-white" : "bg-white border border-zinc-200"} rounded-full px-3 py-1 text-sm`}>
                        Completed
                     </button>
                </div>
                <Pagination
                    page={currentPage}
                    setPage={handlePage}
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