import Order from "./order/Order"
import Spinner from "../common/spinner/Spinner"
import { useGetTakeawayOrdersDataQuery } from "../../store/api/apiSlice"
import { useEffect } from "react"

const TakeawayList = () => {

    const { data: orders, error, isFetching, refetch } = useGetTakeawayOrdersDataQuery()

    if (error) console.log(error)

    useEffect(() => {
        refetch()
    }, [refetch])

    if (orders && orders.length <= 0) {
        return (
            <div className="relative bg-white shadow-md rounded-md my-4 min-h-[30rem] flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                </svg>
                <p>Sie haben keine Bestellungen</p>
            </div>
        )
    }

    return (
        <div className="relative bg-white shadow-md rounded-md my-4">
            {
                !isFetching ?
                    <table className="w-full">
                        <tbody className={`flex flex-col divide-y divide-slate-200 first-line:selection:${isFetching && "opacity-45"}`}>
                            {
                                orders.map(order => {
                                    return (
                                        <Order order={order} key={order.id} />
                                    )
                                })
                            }
                        </tbody>
                    </table> :
                    <div className="w-full h-60 grid place-items-center">
                        <Spinner color={"text-zinc-300"} />
                    </div>
            }
        </div>
    )
}

export default TakeawayList