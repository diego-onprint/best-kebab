export const parseReportsData = (allData) => {

    // Remove orders with "delete" status
    const data = allData.filter(order => order.status.value !== "deleted")

    const getTotalSales = () => data.reduce((acc, curr) => acc + curr.cart.total, 0)

    const getTotalItems = () => {
        const itemsPerOrder = data.map(order => order.cart.products.length)
        return itemsPerOrder.reduce((acc, curr) => acc + curr, 0)
    }

    const getTotalTkwOrders = () => {
        const tkwOrders = data.filter(order => order.details.order_type.value === "lieferung" || order.details.order_type.value === "abholung")
        return tkwOrders.length
    }

    const getTotalOnsiteOrders = () => {
        const onsiteOrders = data.filter(order => order.details.order_type.value === "tisch")
        return onsiteOrders.length
    }

    const getCashOrders = () => {
        const cashOrders = data.filter(order => order.details.payment_method.value === "cash")
        const total = cashOrders.reduce((acc, curr) => acc + curr.cart.total, 0)
        return { totalOrders: cashOrders.length, totalSales: total.toFixed(2)}
    }

    const getCreditOrders = () => {
        const creditOrders = data.filter(order => order.details.payment_method.value === "credit")
        const total = creditOrders.reduce((acc, curr) => acc + curr.cart.total, 0)
        return { totalOrders: creditOrders.length, totalSales: total.toFixed(2)}
    }

    const getTwintOrders = () => {
        const twintOrders = data.filter(order => order.details.payment_method.value === "twint")
        const total = twintOrders.reduce((acc, curr) => acc + curr.cart.total, 0)
        return { totalOrders: twintOrders.length, totalSales: total.toFixed(2)}
    }

    const getTotalTips = () => {
        return data.reduce((acc, curr) => {
            if (curr.details.tip_amount && curr.details.tip_amount.length > 0) {
                return acc + parseFloat(curr.details.tip_amount)
            }
            return acc
        }, 0).toFixed(2)
    }

    return {
        totalSales: getTotalSales().toFixed(2),
        totalItems: getTotalItems(),
        totalOrders: data.length,
        totalTkwOrders: getTotalTkwOrders(),
        totalOnsiteOrders: getTotalOnsiteOrders(),
        cashOrders: getCashOrders(),
        creditOrders: getCreditOrders(),
        twintOrders: getTwintOrders(),
        totalShipping: 0,
        totalTips: getTotalTips(),
        totalCoupons: 0,
    }
}