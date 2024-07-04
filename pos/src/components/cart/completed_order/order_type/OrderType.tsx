const OrderType = ({ orderState, setOrderState, setShowOrderType }) => {

    const handleOrderType = (type) => {
        setOrderState({
            ...orderState,
            details: {
                ...orderState.details,
                order_type: type
            }
        })
        setShowOrderType(false)
    }

    return (
        <div onClick={() => setShowOrderType(false)} className="absolute inset-0 bg-black bg-opacity-20 grid place-items-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-md p-4 w-11/12 max-w-md">
            <div className="flex flex-col gap-2">
                        <button
                            onClick={() => handleOrderType({ name: "Lieferung", value: "lieferung" })}
                            className={`button-base border border-zinc-200 ${orderState.details.order_type.value === "lieferung" && "bg-zinc-200"}`}
                        >
                            Lieferung
                        </button>
                        <button
                            onClick={() => handleOrderType({ name: "Tisch", value: "tisch" })}
                            className={`button-base border border-zinc-200 ${orderState.details.order_type.value === "tisch" && "bg-zinc-200"}`}
                        >
                            Tisch
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default OrderType