import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import Order from "./order/Order"


const TakeawayOrders = () => {

    const orders = useSelector<RootState, Order[]>(state => state.orders.orders)
    const takeawayOrders = orders.filter(order => order.isTkw).reverse()

    return (
        <>
            {
                takeawayOrders.length > 0 ?
                    <table className="w-full">
                        <thead className="sticky -top-6 grid grid-cols-12 gap-2 bg-white p-4 shadow-md shadow-slate-100">
                            <tr className="col-span-2 ">Order</tr>
                            <tr className="col-span-2">Name</tr>
                            <tr className="col-span-2">Status</tr>
                            <tr className="col-span-2">Total</tr>
                        </thead>
                        <tbody className={`flex flex-col divide-y divide-slate-200 bg-white px-4`}>
                            {
                                takeawayOrders.map(order => <Order order={order} key={order.id} />)
                            }
                        </tbody>
                    </table> :
                    <div>No orders</div>
            }
        </>
    )
}

export default TakeawayOrders