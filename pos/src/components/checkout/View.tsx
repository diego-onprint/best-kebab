import PrintButton from "../common/print_button/PrintButton"
import Spinner from "../common/spinner/Spinner"
import Calculator from "./calculator/Calculator"

const View = ({
    loading,
    error,
    checkoutCart,
    paymentMethod,
    orderType,
    handlePaymentMethod,
    handleOrderType,
    setOpenCheckout,
    handleCheckout,
}) => {
    return (
        <div className="grid place-items-center fixed inset-0 py-5 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md p-6 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2 px-6">
                        <button onClick={() => handlePaymentMethod("kasse")} className={`button-base border border-zinc-200 ${paymentMethod === "kasse" && "bg-zinc-200"}`}>Kasse</button>
                        <button onClick={() => handlePaymentMethod("kredikarte")} className={`button-base border border-zinc-200 ${paymentMethod === "kredikarte" && "bg-zinc-200"}`}>Kredikarte</button>
                    </div>
                    <div className="flex flex-col gap-2 px-6 pt-4">
                        <button onClick={() => handleOrderType("delivery")} className={`button-base border border-zinc-200 ${orderType === "delivery" && "bg-zinc-200"}`}>Delivery</button>
                        <button onClick={() => handleOrderType("takeaway")} className={`button-base border border-zinc-200 ${orderType === "takeaway" && "bg-zinc-200"}`}>Takeaway</button>
                        <button onClick={() => handleOrderType("tisch")} className={`button-base border border-zinc-200 ${orderType === "tisch" && "bg-zinc-200"}`}>Tisch</button>
                    </div>
                </div>
                <div className="col-span-9 px-4 flex flex-col gap-4">
                    <Calculator total={checkoutCart.total} />
                    <div className="grid grid-cols-12 gap-2">
                        <button onClick={() => setOpenCheckout(false)} disabled={loading} className="ghost-button col-span-3">Cancel</button>
                        {/* <button onClick={handlePrintTicket} disabled={loading} className="ghost-button col-span-3">Print</button> */}
                        <PrintButton loading={loading} buttonStyle="ghost-button col-span-3">Print</PrintButton>
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