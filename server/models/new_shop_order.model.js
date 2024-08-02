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

export const createShopOrderModel = {
    createOrder,
}