// import { useGetOrdersQuery } from "../../../store/api/apiSlice"
import Order from "../order/Order"
import Spinner from "../../common/spinner/Spinner"
import { useGetCompletedOrdersQuery } from "../../../store/api/apiSlice"

const OrdersList = ({ page, setHasNextPage, setLoading }) => {

    // const { data, error, isFetching, isLoading } = useGetOrdersQuery({ page: page })
    const { data, error, isFetching } = useGetCompletedOrdersQuery()
    
    // //case not found -404- or sorts
    // if (error) throw Error

    // if (data?.hasNextPage) {
    //     setHasNextPage(true)
    // } else {
    //     setHasNextPage(false)
    // }

    // if (isFetching) {
    //     setLoading(true)
    // }
    // else {
    //     setLoading(false)
    // }

    return (
        <div>
            {
                !isFetching ?
                    <table className="w-full">
                        <thead className="sticky -top-6 grid grid-cols-12 gap-2 bg-white p-4 shadow-md shadow-slate-100">
                            <tr className="col-span-2"><td>Order</td></tr>
                            <tr className="col-span-3"><td>Customer</td></tr>
                            <tr className="col-span-2"><td>Date</td></tr>
                            <tr className="col-span-2"><td>Status</td></tr>
                            <tr className="col-span-2"><td>Total</td></tr>
                        </thead>
                        <tbody className={`flex flex-col divide-y divide-slate-200 px-4 first-line:selection:${isFetching && "opacity-45"}`}>
                            {
                                data?.map(order => {
                                    return (
                                        <Order order={order} key={order.order_id} />
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
    )
}

export default OrdersList