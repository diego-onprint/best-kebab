import { pool } from "../db/connection.js"
import { pagination } from "../utils/pagination.js"

const findAllCompletedOrders = async () => {
    const { rows } = await pool.query("SELECT * FROM completed_orders ORDER BY id DESC")
    return rows
}

const findSomeCompletedOrders = async (page, limit, status) => {

    const { rows } = await pool.query("SELECT * FROM completed_orders WHERE status->>'value' = $1 ORDER BY id DESC", [status])
    
    return pagination(rows, page, limit)
}

const updateCompletedOrder = async (id) => {

}

const deleteCompletedOrder = async (id) => {
    // DELETE
    console.log("update status", id)
}

const updateOrderStatus = async (id, data) => {
    try {
        const { status } = data
        await pool.query("UPDATE completed_orders SET status = $1, updated_at = current_timestamp WHERE id = $2", [status, id])
        return { success: true }
    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const deleteOldDeletedOrders = async () => {
    try {
        const query = `
            DELETE FROM completed_orders
            WHERE status->>'value' = 'deleted'
            AND updated_at IS NOT NULL
            AND updated_at < NOW() - INTERVAL '2 weeks';
        `
        await pool.query(query)
        return { success: true }
    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

export const completedOrdersModel = {
    updateCompletedOrder,
    deleteCompletedOrder,
    updateOrderStatus,
    deleteOldDeletedOrders,
    findSomeCompletedOrders,
    findAllCompletedOrders,
}
