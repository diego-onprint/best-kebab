import { pool } from "../db/connection.js"

const createOrder = async (data) => {
    
    try {

        await pool.query('BEGIN');

        const reusableIdResult = await pool.query('SELECT reusable_id FROM reusable_ids ORDER BY id LIMIT 1')
        let newId;

        if (reusableIdResult.rows.length > 0) {
            newId = reusableIdResult.rows[0].reusable_id
            // Delete the used reusable ID
            await pool.query('DELETE FROM reusable_ids WHERE reusable_id = $1', [newId])
        } else {
            // Get the next sequence value
            const sequenceResult = await pool.query("SELECT nextval('orders_id_seq')")
            newId = sequenceResult.rows[0].nextval
        }

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
        const status = { name: "Process", value: "process" }

        const query = "INSERT INTO orders (id, name, cart, details, status ) VALUES ($1, $2, $3, $4, $5) RETURNING *"

        const result = await pool.query(query, [newId, name, cart, details, status ])

        await pool.query('COMMIT')

        return result.rows[0]

    } catch (error) {
        console.error("Error inserting order:", error)
        await pool.query('ROLLBACK')
        return { error: "Internal server error" }
    }
}

///////////////////////////////////////////////

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