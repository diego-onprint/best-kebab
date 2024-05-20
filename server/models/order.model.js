import { pool } from "../db/connection.js"

const findOrderById = async (id) => {
    const query = "SELECT * FROM orders WHERE id = $1"
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const updateOrder = async (id, body) => {

    const client = await pool.connect()

    try {

        const { data } = body

        // If order is from shop
        if (data.fromShop) {

            // Get db order data to update
            const getQuery = 'SELECT * FROM orders WHERE id = $1'
            const { rows } = await pool.query(getQuery, [id])

            // Patch the incoming products from front with the products in the order in the db (if any)
            const concatProducts = [...rows[0].data.cart.products, ...data.cart.products]
            const updatedTotal = Number(rows[0].data.cart.total) + Number(data.cart.total)

            const parsedData = {
                name: rows[0].data.name,
                isTable: true,
                capacity: rows[0].data.capacity,
                cart: {
                    total: updatedTotal.toFixed(2),
                    products: concatProducts,
                },
                customerData: {}
            }

            const updateQuery = 'UPDATE orders SET data = $1 WHERE id = $2'
            await pool.query(updateQuery, [parsedData, id])
        } 

        // If order is from pos
        if (!data.fromShop) {
            // The data is parsed directly in the front-pos!
            const updateQuery = 'UPDATE orders SET data = $1 WHERE id = $2'
            await pool.query(updateQuery, [data, id])
        }

        const getQuery = 'SELECT * FROM orders WHERE id = $1'
        const { rows } = await pool.query(getQuery, [id])
        await client.query('COMMIT')

        return rows[0]

    } catch (err) {

        console.log(err)
        await client.query('ROLLBACK')
        return { error: true, msg: err }

    } finally {

        client.release()
    }
}

export const orderModel = {
    findOrderById,
    updateOrder,
}