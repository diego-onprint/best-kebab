import { useState } from "react"
import type { CartTotal } from "../../../types"

type PropsTypes = {
    total: CartTotal
}

const Calculator = ({ total }: PropsTypes) => {

    const [amount, setAmount] = useState<string | null>(null)
    const [change, setChange] = useState<string | null>(null)
    const [diffError, setDiffError] = useState<string | null>(null)

    const handleAmount = (e: React.MouseEvent<HTMLButtonElement>) => {

        if (diffError) setDiffError(null)

        if (!amount || amount === "0" && e.currentTarget.value !== "0") {
            setAmount(e.currentTarget.value)
        } else {
            setAmount(amount + e.currentTarget.value)
        }
    }

    const handleReturn = () => {
        setAmount(prev => prev.slice(0, -1))
        setChange("0")
    }

    const handleClear = () => {
        setAmount("0")
        setChange("0")
    }

    const handleResult = () => {

        const amountNum = parseFloat(amount)
        const totalNum = parseFloat(total)

        if (amountNum > totalNum) {
            setChange(((amountNum - totalNum).toFixed(2)).toString())
        } else {
            setDiffError("Must be grater thant total cost")
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-2">
                <div className="flex col-span-12 justify-between bg-zinc-100 rounded-md p-5">
                    <div className="text-xl font-semibold">Total</div>
                    <div className="text-xl font-semibold">{total}</div>
                </div>
                <div className={`${!amount && "opacity-50"} relative col-span-6 flex justify-between border border-zinc-200 rounded-md p-5`}>
                    <div className="text-md font-semibold">Bill</div>
                    <div className="text-md font-semibold">{amount}</div>
                    {diffError ? <span className="absolute bottom-0 text-red-500 text-sm">{diffError}</span> : null}
                </div>
                <div className={`${!change && "opacity-50"} col-span-6 flex justify-between border border-zinc-200 rounded-md p-5`}>
                    <div className="text-md font-semibold">Change</div>
                    <div className="text-md font-semibold">{change}</div>
                </div>
            </div>
            <div className="grid grid-cols-4 grid-rows-4 gap-2">
                <button value="7" onClick={handleAmount} className="ghost-button rounded-md">7</button>
                <button value="8" onClick={handleAmount} className="ghost-button rounded-md">8</button>
                <button value="9" onClick={handleAmount} className="ghost-button rounded-md">9</button>
                <button onClick={handleClear} className="ghost-button rounded-md">Clear</button>

                <button value="4" onClick={handleAmount} className="ghost-button rounded-md">4</button>
                <button value="5" onClick={handleAmount} className="ghost-button rounded-md">5</button>
                <button value="6" onClick={handleAmount} className="ghost-button rounded-md">6</button>
                <button onClick={handleReturn} className="ghost-button rounded-md">Return</button>

                <button value="1" onClick={handleAmount} className="ghost-button rounded-md">1</button>
                <button value="2" onClick={handleAmount} className="ghost-button rounded-md">2</button>
                <button value="3" onClick={handleAmount} className="ghost-button rounded-md">3</button>
                <button onClick={handleResult} className="ghost-button rounded-md row-span-2">Enter</button>

                <button value="0" onClick={handleAmount} className="ghost-button rounded-md">0</button>
                <button value="." onClick={handleAmount} className="ghost-button rounded-md">.</button>
            </div>
        </div>
    )
}

export default Calculator