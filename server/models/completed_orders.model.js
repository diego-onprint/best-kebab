import { pool } from "../db/connection.js"

const findAllCompletedOrders = async () => {
    const { rows } = await pool.query("SELECT * FROM completed_orders")
    return rows
}

const updateCompletedOrder = async () => {

}

const deleteCompletedOrder = async () => {

}

export const completedOrdersModel = {
    updateCompletedOrder,
    deleteCompletedOrder,
    findAllCompletedOrders,
}
