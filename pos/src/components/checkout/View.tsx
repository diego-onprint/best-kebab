import Spinner from "../common/spinner/Spinner"
import Calculator from "./calculator/Calculator"

const View = ({
    loading,
    error,
    checkoutCart,
    paymentMethod,
    setPaymentMethod,
    setOpenCheckout,
    handlePrintTicket,
    handleCheckout,
    condition,
    setCondition,
}) => {
    return (
        <div className="grid place-items-center fixed inset-0 py-5 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md p-6 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2 px-6">
                        <button onClick={() => setPaymentMethod("Kasse")} className={`button-base border border-zinc-200 ${paymentMethod === "Kasse" && "bg-zinc-200"}`}>Kasse</button>
                        <button onClick={() => setPaymentMethod("Kredikarte")} className={`button-base border border-zinc-200 ${paymentMethod === "Kredikarte" && "bg-zinc-200"}`}>Kredikarte</button>
                    </div>
                    <div className="flex flex-col gap-2 px-6 pt-4">
                    <button onClick={() => setCondition("delivery")} className={`button-base border border-zinc-200 ${condition === "delivery" && "bg-zinc-200"}`}>Delivery</button>
                    <button onClick={() => setCondition("takeaway")} className={`button-base border border-zinc-200 ${condition === "takeaway" && "bg-zinc-200"}`}>Takeaway</button>
                    <button onClick={() => setCondition("onsite")} className={`button-base border border-zinc-200 ${condition === "onsite" && "bg-zinc-200"}`}>Tisch</button>
                    </div>
                </div>
                <div className="col-span-9 px-4 flex flex-col gap-4">
                    <Calculator total={checkoutCart.total} />
                    <div className="grid grid-cols-12 gap-2">
                        <button onClick={() => setOpenCheckout(false)} disabled={loading} className="ghost-button col-span-3">Cancel</button>
                        <button onClick={handlePrintTicket} disabled={loading} className="ghost-button col-span-3">Print</button>
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
            <div id="to-print">dsl;akjfldlaks</div>
        </div>
    )
}

export default View