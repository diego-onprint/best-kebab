import PrintButton from "../common/print_button/PrintButton"
import Spinner from "../common/spinner/Spinner"
import Calculator from "./calculator/Calculator"

const View = ({
    loading,
    handleCancel,
    order,
    printReceipt,
    setPrintReceipt,
    handlePaymentMethod,
    handleCheckout,
    error,
}) => {

    return (
        <div className="grid place-items-center fixed inset-0 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md py-6 px-2 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Payment Method</p>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Barzahlung", value: "cash" })}
                            className={`button-base border border-zinc-200 ${order.customerData?.paymentMethod?.value === "cash" && "bg-zinc-200"}`}
                        >
                            Barzahlung
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Kreditkarten", value: "credit" })}
                            className={`button-base border border-zinc-200 ${order.customerData?.paymentMethod?.value === "credit" && "bg-zinc-200"}`}
                        >
                            Kreditkarten
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Twint", value: "twint" })}
                            className={`button-base border border-zinc-200 ${order.customerData?.paymentMethod?.value === "twint" && "bg-zinc-200"}`}
                        >
                            Twint
                        </button>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-2 px-6">
                    <Calculator total={order.cart.total} /> :
                </div>
                <div className="col-span-4 flex flex-col gap-2 px-6">
                    <button onClick={handleCancel} disabled={loading} className="ghost-button col-span-3">Cancel</button>
                    {/* <PrintButton loading={loading} buttonStyle="ghost-button col-span-3">Print</PrintButton> */}
                    <button onClick={handleCheckout} disabled={loading} className="primary-button col-span-6">
                        {
                            loading ?
                                <Spinner /> :
                                "Checkout"
                        }
                    </button>
                    <div className="pt-4 flex items-center">
                        <input
                            type="checkbox"
                            // checked={isChecked}
                            onChange={() => setPrintReceipt(!printReceipt)}
                            className="h-6 w-6 rounded border-slate-200 focus:ring-green-500 text-green-600"
                        />
                        <span className="ml-2">Print receipt</span>
                    </div>
                    {error ? <p className="absolute bottom-0 text-red-500 text-xs">{error}</p> : null}
                </div>
            </div>
        </div>
    )
}

export default View