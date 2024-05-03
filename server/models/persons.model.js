import { pool } from "../db/connection.js"

const findAllPersons = async () => {
    const { rows } = await pool.query("SELECT * FROM orders WHERE data ->> 'isPerson' = 'true' ORDER BY uid;")
    return rows
}

export const personsModel = {
    findAllPersons,
}