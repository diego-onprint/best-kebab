import { pool } from "../db/connection.js"

const findOrderById = async (id) => {
    const query = "SELECT * FROM orders WHERE id = $1"
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const updateOrder = async (id, body) => {

    const client = await pool.connect()

    try {

        const updateQuery = 'UPDATE orders SET data = $1 WHERE id = $2'
        const { data } = body
        await pool.query(updateQuery, [data, id])

        const getQuery = "SELECT * FROM orders WHERE id = $1"
        const { rows } = await pool.query(getQuery, [id])
        await client.query('COMMIT')
        
        return rows[0]

    } catch (err) {

        console.log(err)
        await client.query('ROLLBACK')
        throw err

    } finally {
        
        client.release()
    }
}

export const orderModel = {
    findOrderById,
    updateOrder,
}