import { pool } from "../db/connection.js"

import { products } from "../data/products.js"

const findProductById = async (productId) => {
    const product = products.find(prod => prod.id === productId)
    return product
}

export const productModel = {
    findProductById,
}