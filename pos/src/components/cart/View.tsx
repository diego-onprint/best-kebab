import { Suspense, lazy, useState } from "react"
import { Link } from "react-router-dom"
import Item from "./Item/Item"
import usePrintTickets from "../../hooks/usePrintTickets"
import type { Order } from "../../types"
import useIsAndroid from "../../hooks/useIsAndroid"

const Checkout = lazy(() => import("../checkout/Checkout"))

type PropsTypes = {
    order: Order
    isUpdating: boolean
    handleClearCart: () => void
    handleShopPrint: () => void
    handleKitchenPrint: () => void
    handleAndroidShopPrint: () => void
    handleAndroidKitchenPrint: () => void
    handleCheckout: () => void
    clearCurrentOrder: () => void
}

const View = ({
    order,
    isUpdating,
    handleClearCart,
    handleShopPrint,
    handleKitchenPrint,
    handleAndroidShopPrint,
    handleAndroidKitchenPrint,
    handleCheckout,
    clearCurrentOrder,
}: PropsTypes) => {

    const  { isAndroid } = useIsAndroid()

    const getPrintButtons = () => {

        if (isAndroid) {
            return (
                <div className="flex gap-6">
                    <button onClick={handleAndroidShopPrint} disabled={order.data.cart.products.length <= 0} className={`flex gap-1 ${order.data.cart.products.length <= 0 && "opacity-50"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        <span>Shop</span>
                    </button>
                    <button onClick={handleAndroidKitchenPrint} disabled={order.data.cart.products.length <= 0} className={`flex gap-1 ${order.data.cart.products.length <= 0 && "opacity-50"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        <span>Kuche</span>
                    </button>
                </div>
            )
        }

        return (
            <div className="flex gap-6">
                <button onClick={handleShopPrint} disabled={order.data.cart.products.length <= 0} className={`flex gap-1 ${order.data.cart.products.length <= 0 && "opacity-50"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                    </svg>
                    <span>Shop</span>
                </button>
                <button onClick={handleKitchenPrint} disabled={order.data.cart.products.length <= 0} className={`flex gap-1 ${order.data.cart.products.length <= 0 && "opacity-50"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                    </svg>
                    <span>Kuche</span>
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="bg-white flex flex-col w-[475px]">
                <div className={`${isUpdating && "opacity-50"} flex flex-col flex-1 h-full pt-1`}>
                    {
                        order.data ?
                            <>
                                <div className="flex justify-between shadow-md p-3">
                                    <div className="flex">
                                        <button onClick={clearCurrentOrder} className="w-10 cursor-pointer">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                            </svg>
                                        </button>
                                        <h3>{order.data.name}</h3>
                                    </div>
                                    {
                                        order.data.cart.products.length >= 0 ?
                                            getPrintButtons() : null
                                    }
                                </div>
                                <dl className="divide-y flex flex-col flex-1 overflow-auto flex-grow">
                                    {order.data.cart.products.map(product => <Item product={product} key={product.product_uid} />)}
                                </dl>
                                <dl className="divide-y border-t border-zinc-100">
                                    <div className="flex justify-between p-4">
                                        <dt className="text-xl font-semibold">Total</dt>
                                        <dl className="text-xl font-bold">CHF. {order.data.cart.total}</dl>
                                    </div>
                                </dl>
                                <div className="grid grid-cols-12 gap-2 p-4">
                                    <button
                                        onClick={handleClearCart}
                                        className="ghost-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                                        disabled={order.data.cart.products.length <= 0}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={handleCheckout}
                                        className={`primary-button col-span-8 disabled:opacity-50`}
                                        disabled={order.data.cart.products.length <= 0}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </> :
                            <PlaceHolder />
                    }
                </div>
            </div>
        </>
    )
}

export default View

const PlaceHolder = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <Link to="/tables" className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <p>Select a Table</p>
            </Link>
        </div>
    )
}

// const Loader = () => {
//     return (
//         <div className="flex-1 flex justify-center items-center">
//             <div className="flex flex-col items-center">
//                 <Spinner />
//             </div>
//         </div>
//     )
// }