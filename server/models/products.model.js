import { pool } from "../db/connection.js"

const findAllProducts = async () => {
    const { rows } = await pool.query("SELECT * FROM products ORDER BY product_id ASC")
    return rows
}

const findProductsByCategory = async (categoryId) => {
    const query = "SELECT * FROM products WHERE product_parent_category = $1 ORDER BY product_id ASC"
    const { rows } = await pool.query(query, [categoryId])
    return rows
}

export const productsModel = {
    findAllProducts,
    findProductsByCategory,
}