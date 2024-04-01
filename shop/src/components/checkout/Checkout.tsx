import { Dispatch, SetStateAction } from 'react'
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import type { CartTotal } from '../../types'

type PropsTypes = {
    showCheckout: boolean
    setShowCheckout: Dispatch<SetStateAction<boolean>>
}

const Checkout = ({ showCheckout, setShowCheckout }: PropsTypes) => {

    const total = useSelector<RootState, CartTotal>(state => state.cart.total)

    const handlePlaceOrder = () => {
        
    }

    return (
        <div className={`${showCheckout && "-translate-x-full"} transition-transform z-30 flex flex-col bg-white fixed top-0 -right-[100vw] w-[100vw] h-[100vh]`}>
            <div className="relative p-3 shadow-lg">
                <h3 className="text-center font-semibold">Checkout</h3>
                <p className="text-center text-zinc-400">Table 4</p>
                <button onClick={() => setShowCheckout(false)} className="absolute left-2 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="flex-1">

            </div>
            <div className="flex flex-col gap-2 w-full p-5 bg-white border-t border-slate-100 shadow-lg">
                <div className="flex flex-col gap-2">
                    <p className="self-end font-semibold">Table Number 4</p>
                    <div className="flex justify-between">
                        <p className="">Total</p>
                        <p className="text-xl font-semibold">CHF. {total}</p>
                    </div>
                </div>
                <button onClick={handlePlaceOrder} className="primary-button flex-1">Place Order</button>
            </div>
        </div>
    )
}

export default Checkout