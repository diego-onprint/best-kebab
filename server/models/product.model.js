import { pool } from "../db/connection.js"

const findProductById = async (productId) => {
    const query = "SELECT * FROM products WHERE product_id = $1"
    const { rows } = await pool.query(query, [productId])
    return rows[0]
}

export const productModel = {
    findProductById
}