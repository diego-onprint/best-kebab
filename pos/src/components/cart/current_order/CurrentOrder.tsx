import Item from "../Item/Item"
import { formatOrderNumber } from "../../../utils/format/formatOrderNumber"

const CurrentOrder = ({
    order,
    isFetching,
    clearCurrentOrder,
    handleShopPrint,
    handleKitchenPrint,
    handleClearCart,
    handleCheckout,
    handleOrderStatus,
}) => {

    const noProducts = order?.cart.products.length <= 0

    return (
        <div className={`${isFetching ? "opacity-45" : ""} flex flex-col h-screen`}>
            <div className="flex justify-between shadow-md p-3">
                <div className="flex">
                    <button onClick={clearCurrentOrder} className="w-10 cursor-pointer">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                    <h3>{order.is_tkw ? `Takeaway #${formatOrderNumber(order.id)}` : order.name}</h3>
                </div>

                <div className="flex gap-6">
                    <button onClick={handleShopPrint} disabled={noProducts} className={`flex gap-1 ${noProducts && "opacity-50"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        <span>Shop</span>
                    </button>
                    <button onClick={handleKitchenPrint} disabled={noProducts} className={`flex gap-1 ${noProducts && "opacity-50"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        <span>Kuche</span>
                    </button>
                </div>
            </div>
            <dl className="divide-y flex flex-col flex-1 overflow-auto flex-grow">
                {order.cart.products.map(product => <Item product={product} key={product.uid} />)}
            </dl>
            <dl className="divide-y border-t border-zinc-100">
                <div className="flex justify-between p-4">
                    <dt className="text-xl font-semibold">Total</dt>
                    <dl className="text-xl font-bold">CHF {order.cart.total.toFixed(2)}</dl>
                </div>
            </dl>
            <div className="grid grid-cols-12 gap-2 p-4 divide-x divide-zinc-100">
                <button
                    onClick={() => handleOrderStatus(order.id, { name: "Completed", value: "completed" })}
                    className="secondary-button col-span-2 disabled:opacity-50 disabled:hover:bg-zinc-300"
                    disabled={noProducts}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                </button>
                <div className="col-span-10 grid grid-cols-12 gap-1">
                    <button
                        onClick={handleClearCart}
                        className="secondary-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                        disabled={noProducts}
                    >
                        Löschen
                    </button>
                    <button
                        onClick={handleCheckout}
                        className={`primary-button col-span-8 disabled:opacity-50`}
                        disabled={noProducts}
                    >
                        Zur Kasse
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CurrentOrder