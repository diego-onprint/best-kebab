import { Suspense, lazy, useState, useRef, useEffect } from "react"
import Spinner from "../common/spinner/Spinner"
import type { CartProduct } from "../../types"
import PrintButton from "../common/print_button/PrintButton"
import Item from "./Item/Item"
import CreateTkwForm from "../create_tkw_form/CreateTkwForm"
import { useTicketContext } from "../../context/TicketContext"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { updateKitchenTicketNotes } from "../../store/ticket_kitchen/kitchenTicketSlice"

const Checkout = lazy(() => import("../checkout/Checkout"))

type PropsTypes = {
    order: object
    disabled: boolean
    loading: boolean
    handleDelete: (id: CartProduct["uid"]) => void
    handleClearCart: () => void
    clearCurrentOrder: () => void
    hasSelectedItemsToPrint: boolean
    getCartTitle: () => string
}

const View = ({
    order,
    disabled,
    loading,
    handleDelete,
    handleClearCart,
    clearCurrentOrder,
    hasSelectedItemsToPrint,
    getCartTitle,
}: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const { ticketDomRef, kitchenTicketDomRef, specialKitchenTicketDomRef } = useTicketContext()
    const [openCheckout, setOpenCheckout] = useState(false)
    const [openTkwForm, setOpenTkwForm] = useState(false)
    const notesRef = useRef<string | undefined>()

    useEffect(() => {
        // Reset the text box for special tickets when everything deselected
        if (!hasSelectedItemsToPrint) {
            dispatch(updateKitchenTicketNotes(""))
            notesRef.current.value = ""
        }
    }, [dispatch, hasSelectedItemsToPrint])

    const getActionButton = () => {
        if (order.isNewOrder) {
            return (
                <button
                    onClick={() => setOpenTkwForm(true)}
                    className={`primary-button col-span-8 disabled:opacity-50`}
                    disabled={disabled}
                >
                    Create order
                </button>
            )
        }

        return (
            <button
                onClick={() => setOpenCheckout(true)}
                className={`primary-button col-span-8 disabled:opacity-50`}
                disabled={disabled}
            >
                {loading ? <Spinner /> : "Checkout"}
            </button>
        )
    }

    return (
        <>
            <div className="bg-white flex flex-col w-[475px]">
                <div className="flex flex-col flex-1 h-full pt-1">
                    <div className="flex justify-between shadow-md p-3">
                        <div className="flex">
                            {
                                !order.isNewOrder ?
                                    <button onClick={clearCurrentOrder} className="w-10 cursor-pointer">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                        </svg>
                                    </button> : null
                            }
                            <h3 className="font-semibold">{getCartTitle()}</h3>
                        </div>
                        {
                            !order.isNewOrder ?
                            <div className="flex gap-4 pr-2">
                                <PrintButton domRef={ticketDomRef} buttonStyle={`flex gap-1 ${disabled && "opacity-40"}`} disabled={disabled}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                    </svg>
                                    <span>Shop</span>
                                </PrintButton>
                                <PrintButton domRef={kitchenTicketDomRef} buttonStyle={`flex gap-1 ${disabled && "opacity-40"}`} disabled={disabled}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                    </svg>
                                    <span>Küche</span>
                                </PrintButton>
                            </div> : null
                        }
                    </div>
                    <dl className="divide-y flex flex-col flex-1 overflow-auto flex-grow">
                        {order.cart.products.map(product => <Item product={product} key={product.timestamp} handleDelete={handleDelete} />)}
                    </dl>
                    <dl className="divide-y">
                        <div className={`flex justify-between items-center gap-3 bg-zinc-50 px-4 h-64 ${hasSelectedItemsToPrint ? "max-h-14" : "max-h-0"} transition-all overflow-hidden`}>
                            <textarea ref={notesRef} onChange={(e) => dispatch(updateKitchenTicketNotes(e.target.value))} rows={1} className="w-full p-2 h-11 border border-zinc-200 resize-none rounded-md" placeholder="Küche Bemerkung" />
                            <div className="w-20">
                                <PrintButton domRef={specialKitchenTicketDomRef} buttonStyle={`${disabled && "opacity-40"} flex items-center gap-1 bg-zinc-200 rounded-md p-2`} disabled={disabled}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                    </svg>
                                    <span>Küche</span>
                                </PrintButton>
                            </div>
                        </div>
                        {/* <div className="flex justify-between p-4">
                            <dt>Subtotal</dt>
                            <dl>CHF. {currentTable ? currentTable.cart.total : total}</dl>
                        </div> */}
                        <div className="flex justify-between p-4">
                            <dt className="text-xl font-semibold">Total</dt>
                            <dl className="text-xl font-bold">CHF. {order.cart.total}</dl>
                        </div>
                    </dl>
                    <div className="grid grid-cols-12 gap-2 p-4">
                        <button
                            onClick={handleClearCart}
                            className="ghost-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                            disabled={disabled}
                        >
                            Clear
                        </button>
                        {getActionButton()}
                    </div>
                </div>
            </div>
            {openCheckout ? <Suspense><Checkout setOpenCheckout={setOpenCheckout} /></Suspense> : null}
            {openTkwForm ? <Suspense><CreateTkwForm setOpenTkwForm={setOpenTkwForm} /></Suspense> : null}
        </>
    )
}

export default View