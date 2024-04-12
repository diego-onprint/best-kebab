import { useGetSalesReportQuery } from "../../store/api/apiSlice"
import Spinner from "../common/spinner/Spinner"

const SummaryBanner = () => {

    const { data, isFetching } = useGetSalesReportQuery("period=month")

    return (
        <div className="mt-3">
            {
                !isFetching ?
                    <dl className="grid grid-cols-12 gap-2 gap-y-4">
                        <div className="col-span-6 border-l px-4 py-2">
                            <dt>Total orders</dt>
                            <dd className="font-semibold text-2xl">{data.summary.total_orders}</dd>
                        </div>
                        <div className="col-span-6 border-l px-4 py-2">
                            <dt>Total sales</dt>
                            <dd className="font-semibold text-2xl"><span className="text-sm">CHF.</span> {data.summary.total_sales}</dd>
                        </div>
                        <div className="col-span-6 border-l px-4 py-2">
                            <dt>Total net sales</dt>
                            <dd className="font-semibold text-2xl"><span className="text-sm">CHF.</span> {data.summary.net_sales}</dd>
                        </div>
                        <div className="col-span-6 border-l px-4 py-2">
                            <dt>Total shipping</dt>
                            <dd className="font-semibold text-2xl"><span className="text-sm">CHF.</span> {data.summary.total_shipping}</dd>
                        </div>
                    </dl> :
                    <div className="w-full h-full min-h-32 grid place-items-center">
                        <Spinner color={"text-zinc-300"} />
                    </div>
            }
        </div>
    )
}

export default SummaryBanner