import { pool } from "../db/connection.js"

const findCategories = async () => {
    const { rows } = await pool.query("SELECT * FROM categories")
    return rows
}

export const categoriesModel = {
    findCategories
}