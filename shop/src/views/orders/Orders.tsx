import useParam from "../../hooks/useParam"
import { getLocalStorageItem } from "../../utils/localStorage"
import ReturnButton from "../../components/common/return_button/ReturnButton"

const Orders = () => {

    const showOrders = useParam("orders")
    const localOrders = getLocalStorageItem("orders")

    if (showOrders) {
        return (
            <div className="bg-neutral-100 absolute top-0 right-0 w-screen h-screen pb-2 transition-transform z-[999] flex flex-col flex-1">
                <div className="section-header grid place-items-center relative min-h-16">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
                        <ReturnButton style="w-5 h-5" />
                    </div>
                    <h3 className="text-center font-semibold">Meine Bestellungen</h3>
                </div>
                {
                    localOrders ?
                        <ul className="flex flex-col gap-2 p-2">
                            {
                                localOrders.orders.map((order, index) => {
                                    return (
                                        <li key={order.uid} className="rounded-md p-4 bg-white flex flex-col gap-2 divide-y divide-zinc-200">
                                            <div className="flex justify-between">
                                                <p><span className="font-semibold">#{index + 1}</span> <span>at {order.date}</span></p>
                                                <p className="font-semibold">CHF. {order.total}</p>
                                            </div>
                                            <ul className="pt-2 flex flex-col gap-1">
                                                {
                                                    order.products.map(product => {
                                                        return (
                                                            <li key={product.product_uid} className="grid grid-cols-12 gap-2">
                                                                <p className="col-span-7 truncate">{product.product_name}</p>
                                                                <div className="col-span-5 flex justify-between">
                                                                    <p>x {product.product_qty}</p>
                                                                    <p>CHF. {product.product_price}</p>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    )
                                })
                            }
                        </ul> :
                        <div className="flex-1 grid place-items-center">
                            <div className="flex flex-col gap-1 items-center">
                                <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                                </svg>
                                <p>Sie haben keine Bestellungen</p>
                            </div>
                        </div>
                }
            </div>
        )
    }

    return
}

export default Orders