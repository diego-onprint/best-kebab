import { useState } from "react"
import PrintButton from "../common/print_button/PrintButton"
import Spinner from "../common/spinner/Spinner"
import Calculator from "./calculator/Calculator"
import Form from "./form/Form"

const View = ({
    loading,
    error,
    checkoutCart,
    paymentMethod,
    orderType,
    handlePaymentMethod,
    handleOrderType,
    handleForm,
    handleCancel,
    handleCheckout,
}) => {

    const [showCalculator, setShowCalculator] = useState(false)

    return (
        <div className="grid place-items-center fixed inset-0 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md py-6 px-2 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2">
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
                    </div>
                    <div className="flex flex-col gap-2 pt-4">
                        <button onClick={() => handleOrderType({ name: "Lieferung", value: "delivery" })} className={`button-base border border-zinc-200 ${orderType.value === "delivery" && "bg-zinc-200"}`}>Lieferung</button>
                        <button onClick={() => handleOrderType({ name: "Abholung", value: "takeaway" })} className={`button-base border border-zinc-200 ${orderType.value === "takeaway" && "bg-zinc-200"}`}>Abholung</button>
                        <button onClick={() => handleOrderType({ name: "Tisch", value: "tisch" })} className={`button-base border border-zinc-200 ${orderType.value === "tisch" && "bg-zinc-200"}`}>Tisch</button>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-2 px-6">
                    {
                        showCalculator ?
                            <Calculator total={checkoutCart.total} /> :
                            <>
                                <h3 className="font-semibold">Kundendaten</h3>
                                <Form handleForm={handleForm} />
                            </>
                    }
                </div>
                <div className="col-span-4 flex flex-col gap-4 divide-y px-6">
                    <button onClick={handleCancel} disabled={loading} className="ghost-button col-span-3">Cancel</button>
                    <PrintButton loading={loading} buttonStyle="ghost-button col-span-3">Print</PrintButton>
                    <button onClick={() => setShowCalculator(!showCalculator)} disabled={loading} className="ghost-button col-span-3">
                        {!showCalculator ? "Calculator" : "Kundendaten"}
                    </button>
                    <button onClick={handleCheckout} disabled={loading} className="primary-button col-span-6">
                        {
                            loading ?
                                <Spinner /> :
                                "Checkout"
                        }
                    </button>
                    {error ? <p className="absolute bottom-0 text-red-500">{error}</p> : null}
                </div>
            </div>
        </div>
    )
}

export default View