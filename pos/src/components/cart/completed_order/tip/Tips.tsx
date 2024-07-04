const Tip = ({ orderState, setOrderState, setShowTip }) => {

    const handleInput = (e) => {
        setOrderState({
            ...orderState,
            details: {
                ...orderState.details,
                tip_amount: e.target.value
            }
        })
    }

    return (
        <div onClick={() => setShowTip(false)} className="absolute inset-0 bg-black bg-opacity-20 grid place-items-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-md p-4 w-11/12 max-w-md">
                <div className="flex flex-col gap-3">
                    <label className="font-semibold">TIP</label>
                    <input
                        type="text"
                        name="price"
                        value={orderState.details.tip}
                        onChange={handleInput}
                        className="input-field"
                        placeholder="CHF"
                    />
                    <button onClick={() => setShowTip(false)} className="primary-button py-2">Ok</button>
                </div>
            </div>
        </div>
    )
}

export default Tip