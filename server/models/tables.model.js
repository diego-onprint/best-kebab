import { pool } from "../db/connection.js"

const findAllTables = async () => {
    const { rows } = await pool.query("SELECT * FROM shop_tables")
    return rows
}

export const tablesModel = {
    findAllTables,
}