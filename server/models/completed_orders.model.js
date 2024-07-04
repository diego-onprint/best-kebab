import { pool } from "../db/connection.js"
import { pagination } from "../utils/pagination.js"

const findAllCompletedOrders = async () => {
    const { rows } = await pool.query("SELECT * FROM completed_orders ORDER BY id DESC")
    return rows
}

const findSomeCompletedOrders = async (page, limit) => {

    const { rows } = await pool.query("SELECT * FROM completed_orders ORDER BY id DESC")

    return pagination(rows, page, limit)
}

const updateOrderStatus = async (id, data) => {
    try {
        const { status } = data
        await pool.query("UPDATE completed_orders SET status = $1, updated_at = current_timestamp WHERE id = $2", [status, id])
        return { success: true }
    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const deleteOldDeletedOrders = async () => {
    try {
        const query = `
            DELETE FROM completed_orders
            WHERE status->>'value' = 'deleted'
            AND updated_at IS NOT NULL
            AND updated_at < NOW() - INTERVAL '2 weeks';
        `
        await pool.query(query)
        return { success: true }
    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const findCompletedOrderById = async (id) => {
    const query = "SELECT * FROM completed_orders WHERE id = $1"
    const { rows } = await pool.query(query, [id])
    console.log(rows[0])
    return rows[0]
}

const updateCompletedOrderDetails = async (id, body) => {

    try {

        const updateQuery = 'UPDATE completed_orders SET details = $1 WHERE id = $2 RETURNING *'
        const result = await pool.query(updateQuery, [body.data, id])
        return { success: true, result }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const updateCompletedOrderProducts = async (id, body) => {

    const { method } = body

    if (method === "add") {

        const { productData } = body

        try {

            // Query order
            const getQuery = 'SELECT * FROM completed_orders WHERE id = $1'
            const { rows: ordersRows } = await pool.query(getQuery, [id])

            // Query product data
            const query = "SELECT * FROM products WHERE id = $1"
            const { rows: productRows } = await pool.query(query, [productData.id])
            const { name, price, category_id } = productRows[0]

            // Parse product data
            const productToAdd = {
                ...productData,
                name,
                price,
                category_id,
                total: parseFloat(price) * productData.qty
            }

            // Patch the incoming products from front with the products in the order in the db (if any)
            const concatProducts = [...ordersRows[0].cart.products, productToAdd]
            const newTotal = concatProducts.reduce((acc, curr) => acc + curr.total, 0)
            const updatedCart = { total: newTotal, products: concatProducts }

            // Update db with cart + new product
            const updateQuery = 'UPDATE completed_orders SET cart = $1 WHERE id = $2'
            await pool.query(updateQuery, [updatedCart, id])

            return { success: true }

        } catch (err) {

            console.log(err)
            return { error: true, msg: err }
        } 
    }

    if (method === "remove") {

        const { productId } = body

        try {

            // Query order
            const getQuery = 'SELECT * FROM completed_orders WHERE id = $1'
            const { rows: ordersRows } = await pool.query(getQuery, [id])

            // Filter out the product to remove
            const updatedProducts = ordersRows[0].cart.products.filter(product => product.uid !== productId)
            const newTotal = updatedProducts.reduce((acc, curr) => acc + curr.total, 0)
            const updatedCart = { total: newTotal, products: updatedProducts }

            // Update db with cart + new product
            const updateQuery = 'UPDATE completed_orders SET cart = $1 WHERE id = $2'
            await pool.query(updateQuery, [updatedCart, id])

            return { success: true }

        } catch (err) {

            console.log(err)
            return { error: true, msg: err }
        }
    }
}

const deleteCompletedOrder = async (id) => {

    try {

        const orderId = parseInt(id)

        await pool.query('BEGIN')
        const query = "DELETE FROM completed_orders WHERE id = $1 RETURNING id"
        const result = await pool.query(query, [id])

        if (result.rowCount > 0) {
            await pool.query('INSERT INTO reusable_ids (reusable_id) VALUES ($1)', [orderId]);
        }

        await pool.query('COMMIT')
        return { success: true, result }

    } catch (err) {
        console.log(err)
        await pool.query('ROLLBACK')
        return { error: true, msg: err }
    }
}

export const completedOrdersModel = {
    updateOrderStatus,
    deleteOldDeletedOrders,
    findSomeCompletedOrders,
    findAllCompletedOrders,
    findCompletedOrderById,
    updateCompletedOrderDetails,
    updateCompletedOrderProducts,
    deleteCompletedOrder,
}
