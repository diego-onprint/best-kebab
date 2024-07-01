import { pool } from "../db/connection.js"

const createOrder = async (data) => {
    
    try {

        const name = `${data.name} ${data.surname}`
        const cart = { total: 0, products: [] }
        const timestamp = new Date().toISOString()
        const details = {
            created_by: "admin",
            created_at: timestamp,
            customer_data: data,
            payment_method: {
                "name": "Barzahlung",
                "value": "cash"
            },
            order_type: {
                "name": "Lieferung",
                "value": "lieferung"
            },
            shipping_fee: 0,
            table: "",
            tip: "0.00",
        }

        const query = "INSERT INTO orders (name, cart, is_tkw, details) VALUES ($1, $2, $3, $4) RETURNING *"

        const result = await pool.query(query, [name, cart, true, details])

        return result.rows[0]

    } catch (error) {
        console.error("Error inserting order:", error)
        return { error: "Internal server error" }
    }
}

const updateClientData = async (id, data) => {

    const client = await pool.connect()

    try {

        const { customerData } = data

        // Get order
        const getQuery = 'SELECT * FROM orders WHERE id = $1'
        const { rows: ordersRows } = await pool.query(getQuery, [id])
        const order = ordersRows[0]

        const updatedOrderDetails = {
            ...order.details,
            customer_data: customerData
        }

        const query = 'UPDATE orders SET details = $1 WHERE id = $2'
        const response = await pool.query(query, [updatedOrderDetails, id])

        return { success: true, response }

    } catch (err) {
        console.error("Error inserting order:", error)
        return { error: "Internal server error" }
    }
}

export const createOrderModel = {
    createOrder,
    updateClientData,
}