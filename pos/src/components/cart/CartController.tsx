import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../store/current_order/currentOrderSlice"
import { useNavigate } from "react-router-dom"
import { useGetCompletedOrderByIdQuery, useGetOrderDataByIdQuery, useUpdateOrderPrintedProductsMutation } from "../../store/api/apiSlice"
import CurrentOrder from "./current_order/CurrentOrder"
import EmptyCart from "./empty_cart/EmptyCart"
import CompletedOrder from "./completed_order/CompletedOrder"
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import type { RootState, AppDispatch } from "../../store/store"
import type { CurrentOrder } from "../../types"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import useProductActions from "../../hooks/useProductActions"
import usePrintTickets from "../../hooks/usePrintTickets"
import { removeAllSelectedProducts } from "../../store/selected_products/selectedProducts"
import { useEffect } from "react"
import useRefetchOrderById from "../../hooks/useRefetchOrderById"

const CartController = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { removeAllProducts } = useProductActions()
    const { handlePrint } = usePrintTickets()
    const { currentOrderId, completedOrderToEditId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { products: selectedProducts } = useSelector(state => state.selectedProducts)
    const { data: order, isFetching } = useGetOrderDataByIdQuery(currentOrderId)
    const { refetchOrderById } = useRefetchOrderById()
    const [updateOrderPrintedProducts, { isLoading: isUpdatingPrintedProducts }] = useUpdateOrderPrintedProductsMutation()
    const { data: completedOrderToEdit, isFetching: isFetchingCompletedOrder } = useGetCompletedOrderByIdQuery(completedOrderToEditId)

    // TODO sens hasSelectedProducts to CurrentOrder and show Losschen btn if so
    const hasSelectedProducts = selectedProducts.length > 0 

    useEffect(() => {
        handleClearProductSelection()
    }, [currentOrderId])

    const handleClearProductSelection = () => {
        dispatch(removeAllSelectedProducts())
    }

    const handleClearCart = async () => {
        await removeAllProducts()
    }

    const handleCheckout = () => {
        dispatch(setCheckoutMenu(true))
    }

    const handleShopPrint = async () => {

        if (order && currentOrderId && selectedProducts.length > 0) {
            await updateOrderPrintedProducts({ orderId: currentOrderId, selectedProducts })
            await refetchOrderById(currentOrderId)
        }

        handlePrint("shop")
    }

    const handleKitchenPrint = () => {
        handlePrint("kitchen")
    }

    const clearCurrentOrder = () => {
        dispatch(setCurrentOrder(null))
        handleClearProductSelection()
        navigate("/takeaway")
    }

    return (
        <ErrorBoundary fallback={<ErrorFallback><ErrorView /></ErrorFallback>}>
            <div className="bg-white flex flex-col w-[475px] border-l border-l-zinc-200">
                <div className="pt-1">
                    {
                        order && currentOrderId ?
                            <CurrentOrder
                                order={order}
                                isFetching={isFetching}
                                clearCurrentOrder={clearCurrentOrder}
                                handleClearCart={handleClearCart}
                                handleShopPrint={handleShopPrint}
                                handleKitchenPrint={handleKitchenPrint}
                                handleCheckout={handleCheckout}
                            /> : null
                    }
                    {
                        completedOrderToEdit && completedOrderToEditId ?
                        <CompletedOrder
                            order={completedOrderToEdit}
                            isFetching={isFetchingCompletedOrder}
                            handleShopPrint={handleShopPrint}
                        /> : null
                    }
                    {!currentOrderId && !completedOrderToEditId ? <EmptyCart /> : null}
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default CartController

const ErrorView = () => {
    return(
        <div className="bg-white flex flex-col w-[475px] justify-center items-center">
            An error ocurred. Refresh the page.
        </div>
    )
}