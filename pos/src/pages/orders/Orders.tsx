import { useState } from "react"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"
import OrdersList from "../../components/orders_list/OrdersList"
import Pagination from "../../components/pagination/Pagination"

const Orders = () => {

    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loading, setLoading] = useState(false)
    const errorMsg = "An error ocurred fetching orders"

    return (
        <div>
            <div className="flex justify-between items-center z-20">
                <h2 className="section-title">Orders</h2>
                <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} loading={loading} />
            </div>
            <div className="relative bg-white shadow-md rounded-md my-4 min-h-[50rem]">
                <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                    <OrdersList page={page} setHasNextPage={setHasNextPage} setLoading={setLoading} />
                </ErrorBoundary>
            </div>
            <div className="flex justify-end items-center">
                <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} loading={loading} />
            </div>
        </div>
    )
}

export default Orders