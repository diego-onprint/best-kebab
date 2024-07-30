import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import OrdersViewList from "../../components/orders_view_list/OrdersViewList"

const OrdersView = () => {

    const errorMsg = "An error ocurred fetching tables"

    return (
        <div className="flex flex-col h-full bg-zinc-100 p-4">
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <OrdersViewList />
            </ErrorBoundary>
        </div>
    )
}

export default OrdersView