import { useGetSalesReportQuery } from "../../store/api/apiSlice"

const SummaryBanner = () => {

    const { data, isFetching } = useGetSalesReportQuery("period=month")

    return (
        <div className="mt-1">
            {
                !isFetching ?
                <dl className="flex gap-2 flex-wrap divide-x">
                    <div className="flex-1 pr-4 py-2">
                        <dt>Total orders</dt>
                        <dd className="font-semibold text-2xl">{data.summary.total_orders}</dd>
                    </div>
                    <div className="flex-1 px-6 py-2">
                        <dt>Total sales</dt>
                        <dd className="font-semibold text-2xl"><span className="text-sm">CHF.</span> {data.summary.total_sales}</dd>
                    </div>
                    <div className="flex-1 px-6 py-2">
                        <dt>Total net sales</dt>
                        <dd className="font-semibold text-2xl"><span className="text-sm">CHF.</span> {data.summary.net_sales}</dd>
                    </div>
                    <div className="flex-1 px-6 py-2">
                        <dt>Total shipping</dt>
                        <dd className="font-semibold text-2xl"><span className="text-sm">CHF.</span> {data.summary.total_shipping}</dd>
                    </div>
                </dl> : 
                <p>loading...</p>
            }
        </div>
    )
}

export default SummaryBanner