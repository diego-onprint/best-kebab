import { CSVLink } from "react-csv"
import { formatDate } from "../../../utils/format/formatDate"

const CSV = ({ currentData, rawData, selectedDate }) => {

    const ordersContent =
        rawData.length <= 0 ? "" :
            rawData
                .filter(order => order.status.value === "completed")
                .map(order => {
                    return [order.id.toString(), formatDate(order.tmstamp), order.cart.total.toFixed(2), order.cart.products.length.toString(), order.name, order.details.order_type.name, order.details.payment_method.name]
                })

    const productAmounts = {}
    if (rawData?.length > 0) {
        rawData.forEach(order => {
            order.cart?.products?.forEach(product => {
                if (productAmounts[product.name]) {
                    productAmounts[product.name] += product.qty
                } else {
                    productAmounts[product.name] = product.qty
                }
            })
        })
    }

    const parsedProductAmounts = Object.entries(productAmounts).map(([key, value]) => [key, value.toString()]);

    const data = [
        ["Datum", selectedDate],
        [""],
        ["Gesamtumsatz", "Gesamtprodukte", "Gesamtbestellungen"],
        [currentData.totalSales, currentData.totalItems, currentData.totalOrders,],
        [""],
        ["Takeaway", "Tisch",],
        [currentData.totalTkwOrders, currentData.totalOnsiteOrders],
        [""],
        ["Barzahlung Orders", "Barzahlung Total", "Kreditkarten Orders", "Kreditkarten Total", "Twint Orders", "Twint Total"],
        [currentData.cashOrders.totalOrders, currentData.cashOrders.totalSales, currentData.creditOrders.totalOrders, currentData.creditOrders.totalSales, currentData.twintOrders.totalOrders, currentData.twintOrders.totalSales],
        [""],
        ["Bestellung", "Datum", "Gesamt", "Produkten", "Kunden", "Type", "Payment"],
        ...ordersContent,
        [""],
        ["Produkte", "Qty"],
        ...parsedProductAmounts,
    ]

    return (
        <CSVLink data={data} className="col-span-4 flex gap-2 bg-white p-2 rounded-md text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
            CSV herunterladen
        </CSVLink>
    )
}

export default CSV