import { pool } from "../db/connection.js"

const postOrder = async (order) => {
    const postQuery = 'INSERT INTO completed_orders (order_data) VALUES ($1) RETURNING order_id'
    const response = await pool.query(postQuery, [order])
    return response
}

export const checkoutModel = {
    postOrder,
}