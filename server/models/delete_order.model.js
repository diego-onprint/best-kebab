import { pool } from "../db/connection.js"

const deleteOrder = async (id) => {
    try {

        await pool.query('BEGIN');

        // Store the ID of the deleted order in the reusable_ids table
        const insertReusableIdQuery = 'INSERT INTO reusable_ids (reusable_id) VALUES ($1)';
        await pool.query(insertReusableIdQuery, [id]);

        // Delete the order from the orders table
        const deleteOrderQuery = 'DELETE FROM orders WHERE id = $1 RETURNING *';
        const result = await pool.query(deleteOrderQuery, [id]);

        // Commit the transaction
        await pool.query('COMMIT');


        if (result.rows.length === 0) {
            return { error: "Order not found" };
        }

        return { success: true, deletedOrder: result.rows[0] };

    } catch (err) {
        console.error("Error deleting order:", error);
        await pool.query('ROLLBACK');
        return { error: "Internal server error" };
    }
}

export const deleteOrderModel = {
    deleteOrder,
}