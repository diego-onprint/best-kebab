import { pool } from "../db/connection.js"

const findAllTables = async () => {
    const { rows } = await pool.query("SELECT * FROM orders WHERE data ->> 'isTable' = 'true' ORDER BY uid;")
    return rows
}

export const tablesModel = {
    findAllTables,
}