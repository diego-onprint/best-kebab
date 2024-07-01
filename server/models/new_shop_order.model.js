import { pool } from "../db/connection.js"

const createOrder = async (data) => {
    
    try {

        const name = `${data.customerData.name} ${data.customerData.surname}`
        const cart = { total: data.cart.total, products: data.cart.products }
        const timestamp = new Date().toISOString()
        const details = {
            created_by: "shop",
            created_at: timestamp,
            payment_method: data.deliveryData.payment_method,
            order_type: data.deliveryData.order_type,
            customer_data: data.customerData,
            table: data.deliveryData.table,
            delivery_mode: data.deliveryData.mode,
            delivery_time: data.deliveryData.time,
            shipping_fee: data.cart.shipping_fee,
            tip: data.cart.tip.total,
        }

        const query = "INSERT INTO orders (name, cart, is_tkw, details) VALUES ($1, $2, $3, $4) RETURNING *"

        const result = await pool.query(query, [name, cart, true, details])
        return { success: true, data: result.rows[0]}

    } catch (error) {
        console.error("Error inserting order:", error)
        return { error: "Internal server error" }
    }
}

export const createShopOrderModel = {
    createOrder,
}