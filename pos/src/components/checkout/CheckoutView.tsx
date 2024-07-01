/*
TODO use isUpdating with spinner
*/

import { useState } from "react"
import Spinner from "../common/spinner/Spinner"
import Calculator from "./calculator/Calculator"
import type { Order, PaymentMethod } from "../../types"
import Form from "./form/Form"

type PropsTypes = {
    order: Order
    handlePrint: () => void
    handleCancel: () => void
    handlePaymentMethod: (method: PaymentMethod) => void
    handleCheckout: () => void
    handleOrderType: () => void
    setPrintReceipt: () => void
    isUpdating: boolean
}

const CheckoutView = ({
    order,
    paymentMethod,
    orderType,
    handlePrint,
    handleCancel,
    handlePaymentMethod,
    handleCheckout,
    handleOrderType,
    printReceipt,
    setPrintReceipt,
    isUpdating,
}: PropsTypes) => {

    const [isForm, setIsForm] = useState(true)

    const getSection = () => {

        if (order.is_tkw && isForm) return <Form />

        return <Calculator total={order.cart.total} />
    }

    return (
        <div className="dont-print grid place-items-center fixed inset-0 bg-zinc-950/30 z-[100]">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md py-6 px-2 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Zahlungsmethode</h3>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Barzahlung", value: "cash" })}
                            className={`button-base border border-zinc-200 ${paymentMethod.value === "cash" && "bg-zinc-200"}`}
                        >
                            Barzahlung
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Kreditkarten", value: "credit" })}
                            className={`button-base border border-zinc-200 ${paymentMethod.value === "credit" && "bg-zinc-200"}`}
                        >
                            Kreditkarten
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Twint", value: "twint" })}
                            className={`button-base border border-zinc-200 ${paymentMethod.value === "twint" && "bg-zinc-200"}`}
                        >
                            Twint
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Lunchcheck", value: "lunchcheck" })}
                            className={`button-base border border-zinc-200 ${paymentMethod.value === "lunchcheck" && "bg-zinc-200"}`}
                        >
                            Lunchcheck
                        </button>
                    </div>
                    <div className="flex flex-col pt-4">
                        {
                            order.is_tkw ?
                                <button
                                    onClick={() => setIsForm(!isForm)}
                                    className={`button-base flex gap-2 items-center border border-zinc-200}`}
                                >
                                    <span>{isForm ? "Taschenrechner" : "Kundendetails"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                    </svg>
                                </button> : null
                        }
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-2 px-6">
                    {getSection()}
                </div>
                <div className="col-span-4 flex flex-col gap-4 divide-y divide-zinc-200 px-6">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => handleOrderType({ name: "Lieferung", value: "lieferung" })}
                            className={`button-base border border-zinc-200 ${orderType.value === "lieferung" && "bg-zinc-200"}`}
                        >
                            Lieferung
                        </button>
                        <button
                            onClick={() => handleOrderType({ name: "Tisch", value: "tisch" })}
                            className={`button-base border border-zinc-200 ${orderType.value === "tisch" && "bg-zinc-200"}`}
                        >
                            Tisch
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 pt-4">
                        <button onClick={handleCancel} disabled={isUpdating} className="secondary-button col-span-3">Abbrechen</button>
                        <button onClick={handlePrint} className="secondary-button flex gap-3 col-span-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                            </svg>
                            <span>Ticket</span>
                        </button>
                        <button onClick={handleCheckout} disabled={isUpdating} className="primary-button col-span-6">
                            {
                                isUpdating ?
                                    <Spinner /> :
                                    "Checkout"
                            }
                        </button>
                        <div className="pt-4 flex items-center">
                        <input
                            type="checkbox"
                            onChange={() => setPrintReceipt(!printReceipt)}
                            className="h-6 w-6 rounded border-slate-200 focus:ring-green-500 text-green-600"
                        />
                        <span className="ml-2">Print receipt</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutView