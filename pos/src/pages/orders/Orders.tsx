import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import OrdersList from "../../components/orders/orders_list/OrdersList"

const Orders = () => {

    const errorMsg = "An error ocurred fetching orders"

    return (
        <div>
            <div className="flex justify-between items-center z-20">
                <h2 className="section-title">Bestellungen</h2>
            </div>
            <div>
                <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                    <OrdersList />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Orders