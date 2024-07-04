import { pool } from "../db/connection.js"

const postOrder = async (order) => {

    if (!order) {
        return res.status(400).json({ error: "Order details are required" })
    }

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
            const sequenceResult = await pool.query("SELECT nextval('completed_orders_id_seq')")
            newId = sequenceResult.rows[0].nextval
          }
      
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

        const postOrderQuery = "INSERT INTO completed_orders (id, name, cart, details, status) VALUES ($1, $2, $3, $4, $5) RETURNING *"

        const result = await pool.query(postOrderQuery, [newId, name, cart, updatedDetails, status])

        await pool.query('COMMIT')

        return result.rows[0]

    } catch (error) {
        console.error("Error inserting order:", error)
        await pool.query('ROLLBACK')
        return { error: "Internal server error" }
    }
}

export const checkoutModel = {
    postOrder,
}