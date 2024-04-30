import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrderId } from "../../store/current_order/currentOrderSlice"
import { RootState, type AppDispatch } from "../../store/store"
import { useNavigate } from "react-router-dom"
import { useUpdateOrderInDbAndStore } from "../../hooks/useUpdateOrderInDbAndStore"
import { useGetOrderDataByIdQuery } from "../../store/api/apiSlice"
import { updateCurrentOrderData } from "../../store/current_order/currentOrderSlice"
import View from './View'
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"

const Controller = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const currentOrder = useSelector<RootState, object>(state => state.currentOrder)
    const { updateOrder, isUpdating } = useUpdateOrderInDbAndStore()
    const { data: order } = useGetOrderDataByIdQuery(currentOrder.id, {
        pollingInterval: 10000
    })

    useEffect(() => {
        dispatch(updateCurrentOrderData(order?.data))
    }, [dispatch, order])

    // Keep current order updated while selected.

    const handleClearCart = () => {

        const updatedOrder = {
            ...currentOrder,
            data: {
                ...currentOrder.data,
                cart: {
                    ...currentOrder.data.cart,
                    products: []
                }
            }
        }

        updateOrder(updatedOrder)
    }

    const clearCurrentOrder = () => {
        dispatch(setCurrentOrderId(""))
        navigate("/tables")
    }

    return (
        <ErrorBoundary fallback={<ErrorFallback><ErrorView /></ErrorFallback>}>
            <View
                order={currentOrder}
                isUpdating={isUpdating}
                handleClearCart={handleClearCart}
                clearCurrentOrder={clearCurrentOrder}
            />
        </ErrorBoundary>
    )
}

export default Controller

const ErrorView = () => {
    return(
        <div className="bg-white flex flex-col w-[475px] justify-center items-center">
            An error ocurred. Refresh the page.
        </div>
    )
}