import Checkout from "../checkout/Checkout"
import Spinner from "../spinner/Spinner"
import type { CartProduct, CartProductId, CartTotal } from "../../types"
import { Dispatch, SetStateAction } from "react"

type PropsTypes = {
    products: CartProduct[]
    total: CartTotal
    disabled: boolean
    loading: boolean
    openCheckout: boolean
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
    handleDelete: (id: CartProductId) => void
    handleClearCart: () => void
    isTable: boolean
}

const CartView = ({
    products,
    total,
    disabled,
    loading,
    openCheckout,
    setOpenCheckout,
    handleDelete,
    handleClearCart,
    isTable
} : PropsTypes ) => {
    return (
        <>
            <div className="bg-white flex flex-col basis-[350px] max-w-[450px] pt-8">
                {
                    isTable ?
                    <div>Table</div> : null
                }
                <dl className="divide-y flex flex-col flex-1 overflow-auto px-4">
                    {
                        products.map(product => (
                            <li key={product.id} className="flex gap-6 py-4 justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <p className="font-semibold">{product.qty}</p>
                                            <dt className="truncate max-w-60">{product.name}</dt>
                                        </div>
                                        <dd className="font-semibold">
                                            <span className="text-sm">CHF. </span>
                                            {product.price}
                                        </dd>
                                    </div>
                                    {
                                        product.variation ?
                                            <div className="flex justify-between gap-2 pl-4 text-zinc-400">
                                                <p>{product.variation.attributes[0].option}</p>
                                                <dt className="truncate max-w-60">
                                                    <span className="text-sm">CHF. </span>
                                                    {product.variation.price}
                                                </dt>
                                            </div> : null
                                    }
                                </div>
                                <div className="flex gap-10">
                                    <button onClick={() => handleDelete(product.id)} className="text-red-400 cursor-pointer" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </dl>
                <dl className="divide-y border-t">
                    <div className="flex justify-between p-4">
                        <dt>Subtotal</dt>
                        <dl>CHF. {total}</dl>
                    </div>
                    <div className="flex justify-between p-4">
                        <dt className="text-xl font-semibold">Total</dt>
                        <dl className="text-xl font-bold">CHF. {total}</dl>
                    </div>
                </dl>
                <div className="grid grid-cols-12 gap-2 p-4">
                    <button
                        onClick={handleClearCart}
                        className="ghost-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                        disabled={disabled}
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => setOpenCheckout(true)}
                        className={`primary-button col-span-8 disabled:opacity-50`}
                        disabled={disabled}
                    >
                        {loading ? <Spinner /> : "Checkout"}
                    </button>
                </div>
            </div>
            {openCheckout ? <Checkout setOpenCheckout={setOpenCheckout} /> : null}
        </>
    )
}

export default CartView