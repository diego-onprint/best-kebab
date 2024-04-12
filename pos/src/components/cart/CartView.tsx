import Checkout from "../checkout/Checkout"
import Spinner from "../common/spinner/Spinner"
import type { CartProduct, CartProductId, CartTotal, Table } from "../../types"
import { Dispatch, SetStateAction } from "react"
import { formatPrice } from "../../utils/formatPrice"

type PropsTypes = {
    products: CartProduct[]
    total: CartTotal
    disabled: boolean
    loading: boolean
    openCheckout: boolean
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
    handleDelete: (id: CartProductId) => void
    handleClearCart: () => void
    clearTable: () => void
    currentTable: Table | undefined
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
    clearTable,
    currentTable,
}: PropsTypes) => {

    return (
        <>
            <div className="bg-white flex flex-col w-[475px]">
                <div className="flex flex-col flex-1 h-full pt-1">
                    <div className="flex gap-4 shadow-md p-3">
                        {
                            currentTable ?
                                <button onClick={clearTable} className="w-10 cursor-pointer">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                    </svg>
                                </button> : null
                        }
                        <h3 className="font-semibold">{currentTable ? currentTable.name : "Takeaway Order"}</h3>
                    </div>
                    <dl className="divide-y flex flex-col flex-1 overflow-auto px-4 flex-grow">
                        {
                            products.map(product => (
                                <li key={product.timestamp} className="flex gap-6 py-4 justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div className="flex gap-2">
                                                <p className="font-semibold">{product.qty}</p>
                                                <dt className="truncate max-w-52">{product.name}</dt>
                                            </div>
                                            <dd className="font-semibold">
                                                <span className="text-sm">CHF. </span>
                                                {formatPrice(product.price)}
                                            </dd>
                                        </div>
                                        {/* LOOP OVER ARRAY OF VARIATION OPTIONS SELECTED */}
                                        {
                                            product.variations ?
                                                product.variations.map(variation => {
                                                    return (
                                                        <div key={variation.timestamp} className="flex justify-between gap-2 pl-4 text-zinc-400">
                                                            <p>{variation.name} ({variation.parent})</p>
                                                            <dt className="truncate max-w-60">
                                                                <span className="text-sm">CHF. </span>
                                                                {formatPrice(variation.price)}
                                                            </dt>
                                                        </div>
                                                    )
                                                }) : null
                                        }
                                    </div>
                                    <div className="flex gap-10">
                                        <button onClick={() => handleDelete(product.uid)} className="text-red-400 cursor-pointer" type="button">
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
                            <dl>CHF. {currentTable ? currentTable.cart.total : total}</dl>
                        </div>
                        <div className="flex justify-between p-4">
                            <dt className="text-xl font-semibold">Total</dt>
                            <dl className="text-xl font-bold">CHF. {currentTable ? currentTable.cart.total : total}</dl>
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
            </div>
            {openCheckout ? <Checkout setOpenCheckout={setOpenCheckout} /> : null}
        </>
    )
}

export default CartView