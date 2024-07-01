import { pool } from "../db/connection.js"
import { generateSlug } from "../utils/generateSlug.js"

const addProduct = async (data) => {

    const { name, description, img: image, category: parent } = data
    const id = generateSlug(name)
    const price = parseFloat(data.price)

    try {

        const query = "INSERT INTO products (id, name, description, price, parent, image ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"

        const result = await pool.query(query, [id, name, description, price, parent, image])

        return result.rows[0]

    } catch (error) {
        console.error("Error inserting order:", error)
        return { error: "Internal server error" }
    }
}

const removeProduct = async (id) => {
    try {

        const query = "DELETE FROM products WHERE id = $1"
        const result = await pool.query(query, [id])
        return { success: true }

    } catch (err) {

        return { error: true, msg: err }
    }
}

const updateProduct = async (id, data) => {

    const { name, price, description, img: image, category: parent } = data

    try {

        const updateQuery = `
            UPDATE products 
            SET 
                name = $1, 
                description = $2, 
                price = $3, 
                parent = $4,
                image = $5 
            WHERE 
                id = $6
            RETURNING *
        `

        const values = [name, description, price, parent, image, id]

        const response = await pool.query(updateQuery, values)
        
        return response.rows[0]

    } catch (err) {
        console.error("Error updating order:", err)
        return { error: "Internal server error" }
    }
}

const findProductById = async (productId) => {
    const query = "SELECT * FROM products WHERE id = $1"
    const { rows } = await pool.query(query, [productId])
    return rows[0]
}

export const productModel = {
    findProductById,
    addProduct,
    removeProduct,
    updateProduct,
}