import { pool } from "../db/connection.js"

const removeOrder = async (id) => {
    
    try {

        const query = "DELETE FROM orders WHERE id = $1 RETURNING *"
        const result = await pool.query(query, [id])
        return result

    } catch (err) {

        return { error: true, msg: err }
    }
}

export const removeOrderModel = {
    removeOrder,
}