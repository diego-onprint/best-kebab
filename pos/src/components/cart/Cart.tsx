import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../store/current_order/currentOrderSlice"
import { useGetOrderDataByIdQuery, useGetTakeawayOrdersDataQuery, useUpdateOrderPrintedProductsMutation, useUpdateOrderStatusMutation } from "../../store/api/apiSlice"
import toast from "react-hot-toast"
import EmptyCart from "./empty_cart/EmptyCart"
import ErrorBoundary from "../common/error_boundary/ErrorBoundary"
import ErrorFallback from "../common/error_fallback/ErrorFallback"
import type { AppDispatch } from "../../store/store"
import { setCheckoutMenu } from "../../store/menus/menusSlice"
import useProductActions from "../../hooks/useProductActions"
import usePrintTickets from "../../hooks/usePrintTickets"
import { removeAllSelectedProducts } from "../../store/selected_products/selectedProducts"
import { useEffect } from "react"
import useRefetchOrderById from "../../hooks/useRefetchOrderById"
import socket from "../../socket"
import CartItem from "./cart_item/CartItem"
import { formatOrderNumber } from "../../utils/format/formatOrderNumber"

const Cart = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { removeAllProducts } = useProductActions()
    const { handlePrint } = usePrintTickets()
    const { currentOrderId } = useSelector(state => state.currentOrder)
    const { products: selectedProducts } = useSelector(state => state.selectedProducts)
    const { data: order, isFetching } = useGetOrderDataByIdQuery(currentOrderId)
    const { refetchOrderById } = useRefetchOrderById()
    const { refetch: refetchTkwOrders } = useGetTakeawayOrdersDataQuery()
    const [updateOrderPrintedProducts, { isLoading: isUpdatingPrintedProducts }] = useUpdateOrderPrintedProductsMutation()
    const [updateOrderStatus, { isLoading: isUpdatingStatus }] = useUpdateOrderStatusMutation()

    // TODO sens hasSelectedProducts to CurrentOrder and show Losschen btn if so
    const hasSelectedProducts = selectedProducts.length > 0
    const noProducts = order?.cart.products.length <= 0

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
    }

    console.log(currentOrderId)

    const handleOrderStatus = async (order, status) => {

        const response = await updateOrderStatus({ orderId: order, status })

        socket.emit("order-status-updated", { success: true })

        if (response.data.success) {
            toast.success(`Order #${order} is ready`)
            await refetchTkwOrders()
        }
    }

    useEffect(() => {
        handleClearProductSelection()
    }, [currentOrderId])

    return (
        <ErrorBoundary fallback={<ErrorFallback><ErrorView /></ErrorFallback>}>
            <div className="bg-white flex flex-col w-[475px] border-l border-l-zinc-200">
                <div className="pt-1">
                    {
                        order && currentOrderId ?
                            <div className={`${isFetching ? "opacity-45" : ""} flex flex-col h-screen`}>
                                <div className="flex justify-between shadow-md p-3">
                                    <div className="flex">
                                        <button onClick={clearCurrentOrder} className="w-10 cursor-pointer">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                            </svg>
                                        </button>
                                        <h3>#{formatOrderNumber(order.id)}</h3>
                                    </div>
                                    <div className="flex gap-6">
                                        <button onClick={handleShopPrint} disabled={noProducts} className={`flex gap-1 ${noProducts && "opacity-50"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                            </svg>
                                            <span>Shop</span>
                                        </button>
                                        <button onClick={handleKitchenPrint} disabled={noProducts} className={`flex gap-1 ${noProducts && "opacity-50"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                            </svg>
                                            <span>Kuche</span>
                                        </button>
                                    </div>
                                </div>
                                <dl className="divide-y flex flex-col flex-1 overflow-auto flex-grow">
                                    {order.cart.products.map(product => <CartItem product={product} key={product.uid} />)}
                                </dl>
                                <dl className="divide-y border-t border-zinc-100">
                                    <div className="flex justify-between p-4">
                                        <dt className="text-xl font-semibold">Total</dt>
                                        <dl className="text-xl font-bold">CHF {order.cart.total.toFixed(2)}</dl>
                                    </div>
                                </dl>
                                <div className="grid grid-cols-12 gap-2 p-4 divide-x divide-zinc-100">
                                    <div className="col-span-2 flex flex-col disabled:opacity-50">
                                        <button
                                            onClick={handleClearCart}
                                            className="secondary-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                                            disabled={noProducts}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                        </button>
                                        <span className="text-[10px] text-center">
                                            Löschen
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex flex-col disabled:opacity-50">
                                        <button
                                            onClick={() => console.log("EDIT ORDER")}
                                            className="secondary-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                                            disabled={noProducts}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </button>
                                        <span className="text-[10px] text-center">
                                            Edit
                                        </span>
                                    </div>

                                    <div className="col-span-4 flex flex-col disabled:opacity-50">
                                        <button
                                            onClick={() => handleOrderStatus(order.id, { name: "Ready", value: "ready" })}
                                            className="secondary-button bg-green-500 text-white border-green-500 disabled:opacity-50 disabled:hover:bg-zinc-300"
                                            disabled={noProducts}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                        </button>
                                        <span className="text-[10px] text-center">
                                            Ready
                                        </span>
                                    </div>
                                    <div className="col-span-4 flex flex-col disabled:opacity-50">
                                        <button
                                            onClick={handleCheckout}
                                            className={"primary-button border border-blue-500 col-span-8"}
                                            disabled={noProducts}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                            </svg>
                                        </button>
                                        <span className="text-[10px] text-center">
                                            Zur Kasse
                                        </span>
                                    </div>
                                </div>
                            </div> : <EmptyCart />
                    }
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default Cart

const ErrorView = () => {
    return (
        <div className="bg-white flex flex-col w-[475px] justify-center items-center">
            An error ocurred. Refresh the page.
        </div>
    )
}