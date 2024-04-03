import { useState, Dispatch, SetStateAction } from 'react'
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import type { CartProduct, CartTotal } from '../../types'
import Spinner from '../spinner/Spinner'
import Modal from '../modal/Modal'

type PropsTypes = {
    showCheckout: boolean
    setShowCheckout: Dispatch<SetStateAction<boolean>>
    table: string
}

const Checkout = ({ showCheckout, setShowCheckout, table }: PropsTypes) => {

    const total = useSelector<RootState, CartTotal>(state => state.cart.total)
    const cart = useSelector<RootState, CartProduct[]>(state => state.cart.products)
    const [loading, setLoading] = useState(false)
    const [placeOrderError, setPlaceOrderError] = useState("")
    const [customerData, setCustomerData] = useState({
        customer: "",
        address: "",
        postcode: "",
        city: "",
        country: "",
        phone: "",
        email: "",
    })
    const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-local-order" : "https://onprintpos.diegoui.com.ar/api/new-local-order"

    const handlePlaceOrder = async (e: React.MouseEvent) => {
        e.preventDefault()
        
        setLoading(true)
        
        const parsedCart = cart.map(product => ({ product_id: product.id, quantity: product.qty }))

        console.log(customerData)
        console.log("CHECKOUT.....", parsedCart)

        try {

            const data = {
                customer: customerData.customer,
                table: table,
                payment_method: "Bank Transfer / Cash",
                phone: customerData.phone,
                products: parsedCart,
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }

            const response = await fetch(newOrderUrl, options)

            const result = await response.json()

            console.log("API POST RESULT....", result)

            if (!response.ok) {
                throw new Error("Ocurrió un error creando una nueva orden")
            }

        } catch (err) {

            console.error(err)
            setPlaceOrderError("An error ocurred, please try again later.")

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className={`${showCheckout && "-translate-x-full"} transition-transform z-30 flex flex-col bg-white fixed top-0 -right-[100vw] w-[100vw] h-[80vh]`}>
            <div className="relative p-3 shadow-lg">
                <h3 className="text-center font-semibold">Checkout</h3>
                <p className="text-center text-zinc-400">Table {table}</p>
                <button onClick={() => setShowCheckout(false)} className="absolute left-2 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 bg-neutral-100">
                <form className="relative px-4 pt-8 flex flex-col gap-4 w-full max-w-xl">
                    <input onChange={(e) => setCustomerData({ ...customerData, customer: e.target.value })} type="text" placeholder="Name" className="input-base" />
                    <input onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })} type="text" value={`Table ${table}`} className="input-base" disabled />
                </form>
            </div>
            <div className="flex flex-col gap-2 w-full p-5 bg-white border-t border-slate-100 shadow-lg">
                <div className="flex flex-col gap-2">
                    <p className="self-end font-semibold">Table Num. {table}</p>
                    <div className="flex justify-between">
                        <p className="">Total</p>
                        <p className="text-xl font-semibold">CHF. {total}</p>
                    </div>
                </div>
                <button onClick={handlePlaceOrder} className="primary-button flex-1">
                    {
                        loading ?
                        <Spinner /> :
                        "Place Order"
                    }
                </button>
            </div>
            {
                placeOrderError.length > 0 ?
                <Modal action={() => setPlaceOrderError("")}>
                    <div className="bg-white rounded-md p-4">
                        {placeOrderError}
                    </div>
                </Modal>:
                null
            }
        </div>
    )
}

export default Checkout