import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrderId } from "../../store/current_order/currentOrderSlice"
import { useNavigate } from "react-router-dom"
import { useUpdateOrderInDbAndStore } from "../../hooks/useUpdateOrderInDbAndStore"
import { useGetOrderDataByIdQuery } from "../../store/api/apiSlice"
import { updateCurrentOrderData } from "../../store/current_order/currentOrderSlice"
import View from './View'
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import type { RootState, AppDispatch } from "../../store/store"
import type { Order } from "../../types"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import usePrintTickets from "../../hooks/usePrintTickets"

const Controller = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const { updateOrder, isUpdating } = useUpdateOrderInDbAndStore()
    const { data: order } = useGetOrderDataByIdQuery(currentOrder.id, {
        pollingInterval: 10000
    })
    const { printShopTicket, printKitchenTicket } = usePrintTickets()

    // Keep current order (redux) updated/synced with DB while selected.
    useEffect(() => {
        dispatch(updateCurrentOrderData(order?.data))
    }, [dispatch, order])

    const handleClearCart = () => {

        const updatedOrder = {
            ...currentOrder,
            data: {
                ...currentOrder.data,
                cart: {
                    ...currentOrder.data.cart,
                    products: [],
                    total: 0
                }
            }
        }

        updateOrder(updatedOrder)
    }

    const handleCheckout = () => {
        dispatch(setCheckoutMenu(true))
    }

    const handleShopPrint = () => {
        printShopTicket()
    }

    const handleKitchenPrint = () => {
        printKitchenTicket()
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
                handleCheckout={handleCheckout}
                handleShopPrint={handleShopPrint}
                handleKitchenPrint={handleKitchenPrint}
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