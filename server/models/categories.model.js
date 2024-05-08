import { pool } from "../db/connection.js"

import { categories } from "../data/categories.js"

const findCategories = async () => {
    // const { rows } = await pool.query("SELECT * FROM categories")
    // return rows

    //DEV
    return categories
}

export const categoriesModel = {
    findCategories
}