import { pool } from "../db/connection.js"
import { generateSlug } from "../utils/generateSlug.js"

const findCategories = async () => {
    const { rows } = await pool.query("SELECT * FROM categories")
    return rows
}

const createCategory = async (data) => {

    try {

        const { name } = data
        const id = generateSlug(name)

        const query = "INSERT INTO categories (id, name) VALUES ($1, $2)"

        const result = await pool.query(query, [id, name])

        return { success: true, data: result }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const deleteCategory = async (id) => {
    try {
        const query = "DELETE FROM categories WHERE id = $1"
        const result = await pool.query(query, [id])
        return { success: true }

    } catch (err) {

        return { error: true, msg: err }
    }
}

export const categoriesModel = {
    findCategories,
    createCategory,
    deleteCategory,
}