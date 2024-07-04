import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import Item from "./item/Item"
import PaymentDetails from "./payment_details/PaymentDetails"
import OrderType from "./order_type/OrderType"
import Tip from "./tip/Tips"
import { setCompletedOrderToEdit } from "../../../store/current_order/currentOrderSlice"
import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"
import { useDeleteCompletedOrderMutation, useGetCompletedOrdersByPageQuery, useUpdateCompletedOrderDetailsMutation } from "../../../store/api/apiSlice"

const CompletedOrder = ({
    order,
    isFetching,
    handleShopPrint,
}) => {

    const dispatch = useDispatch()
    const [orderState, setOrderState] = useState(order)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const [showOrderType, setShowOrderType] = useState(false)
    const [showTip, setShowTip] = useState(false)
    const [deleteCompletedOrder] = useDeleteCompletedOrderMutation()
    const [updateCompletedOrderDetails] = useUpdateCompletedOrderDetailsMutation()
    const { refetch } = useGetCompletedOrdersByPageQuery({ page: 1, limit: 10 })

    const clearCurrentOrder = () => {
        dispatch(setCompletedOrderToEdit(null))
    }

    const handleDeleteOrder = async () => {
        const response = await deleteCompletedOrder(order.id)

        if (response.data.error) return toast.error("Error deleting order")

        toast.success(`Order #${formatOrderNumber(response.data.result.rows[0].id)} deleted`)
        clearCurrentOrder()
        refetch()
        return
    }

    const handleUpdateOrderDetails = async () => {
        const response = await updateCompletedOrderDetails({ id: order.id, data: orderState.details })

        if (response.data.error) return toast.error("Error updating order")

        toast.success(`Order #${formatOrderNumber(response.data.result.rows[0].id)} updated`)
        refetch()
    }

    useEffect(() => {
        setOrderState(order)
    }, [order])

    console.log(orderState)
    // console.log(order)

    return (
        <>
            <div className={`${isFetching ? "opacity-45" : ""} flex flex-col h-screen`}>
                <div className="flex justify-between shadow-md p-3">
                    <div className="flex">
                        <button onClick={clearCurrentOrder} className="w-10 cursor-pointer">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </button>
                        <h3>Bestellung #{formatOrderNumber(orderState.id)}</h3>
                    </div>
                    <div className="flex gap-6">
                        <button onClick={handleShopPrint} className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                            </svg>
                            <span>Ticket</span>
                        </button>
                    </div>
                </div>
                <dl className="divide-y flex flex-col flex-1 overflow-auto flex-grow">
                    {orderState.cart.products.map(product => <Item product={product} key={product.uid} />)}
                </dl>
                <dl className="divide-y border-t border-zinc-200">
                    <div className="flex justify-between p-4">
                        <dt className="text-zinc-400 font-semibold">Total</dt>
                        <dd className="text-zinc-400 font-bold">CHF {orderState.cart.total.toFixed(2)}</dd>
                    </div>
                </dl>
                <dl className="divide-y flex flex-col flex-1 overflow-auto flex-grow p-4 border-t border-zinc-200">
                    <button onClick={() => setShowPayment(true)} className="flex justify-between py-4">
                        <dt className="font-semibold">Zahlungsmethode</dt>
                        <dd className="flex gap-3 items-center">
                            <span>{orderState.details.payment_method.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </dd>
                    </button>
                    <button onClick={() => setShowOrderType(true)} className="flex justify-between py-4">
                        <dt className="font-semibold">Bestellung</dt>
                        <dd className="flex gap-3 items-center">
                            <span>{orderState.details.order_type.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </dd>
                    </button>
                    {/* <button onClick={() => setShowTip(true)} className="flex justify-between py-4">
                        <dt className="font-semibold">Tip</dt>
                            <dd className="flex gap-3 items-center">
                                <span>CHF {orderState.details.tip ? orderState.details.tip : "0"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </dd>
                    </button> */}
                    {/* <button onClick={handleEditTip} className="flex justify-between py-4">
                        <dt className="font-semibold">Kundendetails</dt>
                            <dd className="flex gap-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </dd>
                    </button> */}
                </dl>
                <div className="grid grid-cols-12 gap-2 p-4 border-t border-zinc-200">
                    <button
                        onClick={() => setOpenDeleteModal(true)}
                        className="secondary-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300 flex items-center gap-1"
                    >
                        <span>Löschen</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-400">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={handleUpdateOrderDetails}
                        className={`primary-button col-span-8 disabled:opacity-50`}
                    >
                        Aktualisieren
                    </button>
                </div>
                {
                    openDeleteModal ?
                        <div onClick={() => setOpenDeleteModal(false)} className="modal-overlay bg-opacity-10">
                            <div onClick={(e) => e.stopPropagation()} className="px-4 py-4 space-y-8 bg-white rounded-md w-72 shadow-md">
                                <p className="text-center text-xl">Delete Bestellung #{formatOrderNumber(orderState.id)}</p>
                                <div className="grid grid-cols-12 gap-4">
                                    <button onClick={() => setOpenDeleteModal(false)} className="secondary-button py-3 col-span-6">Abbrechen</button>
                                    <button onClick={handleDeleteOrder} className="alert-button py-3 col-span-6">Löschen</button>
                                </div>
                            </div>
                        </div> : null
                }
            </div>
            {showPayment ? <PaymentDetails orderState={orderState} setOrderState={setOrderState} setShowPayment={setShowPayment} /> : null}
            {showOrderType ? <OrderType orderState={orderState} setOrderState={setOrderState} setShowOrderType={setShowOrderType} /> : null}
            {showTip ? <Tip orderState={orderState} setOrderState={setOrderState} setShowTip={setShowTip} /> : null}
            {/* CURRENTLY CLIENT DOESNT TAKE CUSTOMER DETAILS - NO DATA OF CUSTOMERS IN COMPLETED ORDERS */}
            {/* {showClientDetails ? <ClientDetails orderState={orderState} setOrderState={setOrderState} setShowClientDetails={setShowClientDetails} /> : null} */}
        </>
    )
}

export default CompletedOrder