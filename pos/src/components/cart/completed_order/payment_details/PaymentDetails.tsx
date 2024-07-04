const PaymentDetails = ({ orderState, setOrderState, setShowPayment }) => {

    const handlePaymentMethod = (method) => {
        setOrderState({
            ...orderState,
            details: {
                ...orderState.details,
                payment_method: method
            }
        })
        setShowPayment(false)
    }

    return (
        <div onClick={() => setShowPayment(false)} className="absolute inset-0 bg-black bg-opacity-20 grid place-items-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-md p-4 w-11/12 max-w-md">
                <div className="space-y-2">
                    <h3 className="font-semibold">Zahlungsmethode</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePaymentMethod({ name: "Barzahlung", value: "cash" })}
                            className={`button-base flex-1 border border-zinc-200 ${orderState.details.payment_method.value === "cash" && "bg-zinc-200"}`}
                        >
                            Barzahlung
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Kreditkarten", value: "credit" })}
                            className={`button-base flex-1 border border-zinc-200 ${orderState.details.payment_method.value === "credit" && "bg-zinc-200"}`}
                        >
                            Kreditkarten
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Twint", value: "twint" })}
                            className={`button-base flex-1 border border-zinc-200 ${orderState.details.payment_method.value === "twint" && "bg-zinc-200"}`}
                        >
                            Twint
                        </button>
                        <button
                            onClick={() => handlePaymentMethod({ name: "Lunchcheck", value: "lunchcheck" })}
                            className={`button-base flex-1 border border-zinc-200 ${orderState.details.payment_method.value === "lunchcheck" && "bg-zinc-200"}`}
                        >
                            Lunchcheck
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetails