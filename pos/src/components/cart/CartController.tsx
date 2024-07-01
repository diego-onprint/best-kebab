import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../store/current_order/currentOrderSlice"
import { useNavigate } from "react-router-dom"
import { useGetOrderDataByIdQuery, useUpdateOrderPrintedProductsMutation } from "../../store/api/apiSlice"
import CartView from './CartView'
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import useRefetchOrderById from "../../hooks/useRefetchOrderById"
import useProductActions from "../../hooks/useProductActions"
import usePrintTickets from "../../hooks/usePrintTickets"
import { removeAllSelectedProducts } from "../../store/selected_products/selectedProducts"
import type { RootState, AppDispatch } from "../../store/store"
import type { CurrentOrder } from "../../types"

const CartController = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { removeAllProducts } = useProductActions()
    const { handlePrint } = usePrintTickets()
    const { currentOrderId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { products: selectedProducts } = useSelector(state => state.selectedProducts)
    const { data: order, isFetching } = useGetOrderDataByIdQuery(currentOrderId)
    const { refetchOrderById } = useRefetchOrderById()
    const [updateOrderPrintedProducts, { isLoading: isUpdatingPrintedProducts }] = useUpdateOrderPrintedProductsMutation()

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

        if (selectedProducts.length > 0) {
            await updateOrderPrintedProducts({ orderId: currentOrderId, selectedProducts })
            await refetchOrderById(currentOrderId)
            console.log(currentOrderId, selectedProducts)
        }

        handlePrint("shop")
    }

    const handleKitchenPrint = () => {
        handlePrint("kitchen")
    }

    const clearCurrentOrder = () => {
        dispatch(setCurrentOrder(null))
        handleClearProductSelection()
        navigate("/")
    }

    return (
        <ErrorBoundary fallback={<ErrorFallback><ErrorView /></ErrorFallback>}>
            <CartView
                order={order}
                isFetching={isFetching}
                handleClearCart={handleClearCart}
                handleCheckout={handleCheckout}
                handleShopPrint={handleShopPrint}
                handleKitchenPrint={handleKitchenPrint}
                handleClearProductSelection={handleClearProductSelection}
                hasSelectedProducts={hasSelectedProducts}
                currentOrderId={currentOrderId}
                clearCurrentOrder={clearCurrentOrder}
            />
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