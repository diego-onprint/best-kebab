import { pool } from "../db/connection.js"

const postOrder = async (order) => {

    if (!order) {
        return res.status(400).json({ error: "Order details are required" })
    }

    try {

        const getOrderQuery = "SELECT * FROM orders WHERE id = $1"
        const { rows: orderRows } = await pool.query(getOrderQuery, [order.id])
        const name = orderRows[0].name
        const cart = orderRows[0].cart
        const updatedDetails = {
            ...orderRows[0].details,
            order_type: order.details.order_type,
            payment_method: order.details.payment_method,
            created_by: order.details.created_by
        }
        const status = { value: "completed", name: "Completed" }

        const postOrderQuery = "INSERT INTO completed_orders (name, cart, details, status) VALUES ($1, $2, $3, $4) RETURNING *"

        const result = await pool.query(postOrderQuery, [name, cart, updatedDetails, status])

        return result.rows[0]

    } catch (error) {
        console.error("Error inserting order:", error)
        return { error: "Internal server error" }
    }
}

export const checkoutModel = {
    postOrder,
}