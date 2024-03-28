import { useGetSalesReportQuery } from "../../store/api/apiSlice"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const MonthSalesGraph = () => {

    const { data, isFetching } = useGetSalesReportQuery("period=month")
    const parsedData = !isFetching && Object.entries(data.summary.totals).map(([date, values]) => ({ name: date, orders: values.orders, sales: values.sales, shipping: values.shipping }))

    // console.log(data)
    console.log(parsedData)

    return (
        <div className="w-full h-96">
            {
                !isFetching ?
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={parsedData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="orders" stroke="#82ca9d" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="shipping" stroke="#efefef" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer> :
                    <p>loading...</p>
            }
        </div>
    )
}

export default MonthSalesGraph