import { pool } from "../db/connection.js"

const createOrder = async (data) => {
    
    try {

        const name = `${data.name} ${data.surname}`
        const cart = { total: 0, products: [] }
        const timestamp = new Date().toISOString()
        const details = {
            // status: {
            //     name: "Process",
            //     value: "process",
            // },
            //CHECK HOW TO HANDLE STATUS!
            created_by: "admin",
            created_at: timestamp,
            payment_method: {
                "name": "Barzahlung",
                "value": "cash"
            },
            order_type: {
                "name": "Lieferung",
                "value": "lieferung"
            },
            customer_data: data
        }

        const query = "INSERT INTO orders (name, cart, is_tkw, details) VALUES ($1, $2, $3, $4) RETURNING *"

        const result = await pool.query(query, [name, cart, true, details])

        return result.rows[0]

    } catch (error) {
        console.error("Error inserting order:", error)
        return { error: "Internal server error" }
    }
}

export const remoteShopOrderModel = {
    createOrder,
}