import { pool } from "../db/connection.js"

let ORDER_ID = 0 // Make an array in the DB and push the orders id as to get a list of all ids and use the ones that arent there, else, the last one plus 1

const createOrder = async ({ status }) => {
    const query = "INSERT INTO orders (order_id, status) VALUES ($1, $2) RETURNING *"
    const { rows } = await pool.query(query, [ ORDER_ID, status ])
}

const updateOrder = async = () => {

}

const deleteOrder = async () => {

}

const findAllOrders = async () => {

}

export const orderModel = {
    createOrder,
    updateOrder,
    deleteOrder,
    findAllOrders,
}
