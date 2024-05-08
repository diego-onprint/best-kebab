import { pool } from "../db/connection.js"

import { products } from "../data/products.js"

const findAllProducts = async () => {
    const { rows } = await pool.query("SELECT * FROM products")
    return rows
}

const findProductsByCategory = async (categoryId) => {
    // const query = "SELECT * FROM products WHERE product_parent_category = $1"
    // const { rows } = await pool.query(query, [categoryId])
    // return rows

    return products.filter(prod => prod.parent === categoryId)
}

export const productsModel = {
    findAllProducts,
    findProductsByCategory,
}