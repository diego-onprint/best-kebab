import { pool } from "../db/connection.js"
import { sentCompletedOrderMail } from "../utils/sendCompletedOrderMail.js";

const getCartTotal = (cart) => {
    return cart.reduce((acc, item) => {
        // Calculate base price for the item
        let itemTotal = item.total

        // Add price of each variation (by qty)
        if (item.variations && item.variations.length > 0) {
            item.variations.forEach(variation => {
                itemTotal += variation.option_price * item.qty;
            });
        }

        // Add the item total to the accumulated total
        return acc + itemTotal
    }, 0)
}

const updateOrder = async (id, body) => {

    const client = await pool.connect()
    const { method } = body

    // Add product
    if (method === "add") {

        const { productData } = body

        try {

            // Query order
            const getQuery = 'SELECT * FROM orders WHERE id = $1'
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
            const newTotal = getCartTotal(concatProducts)
            const updatedCart = { total: newTotal, products: concatProducts }

            // Update db with cart + new product
            const updateQuery = 'UPDATE orders SET cart = $1 WHERE id = $2'
            await pool.query(updateQuery, [updatedCart, id])

            // Query updated DB order
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

    // Remove product
    if (method === "remove") {

        const { productUid } = body

        try {

            // Query order
            const getQuery = 'SELECT * FROM orders WHERE id = $1'
            const { rows: ordersRows } = await pool.query(getQuery, [id])

            // Filter out the product to remove
            const updatedProducts = ordersRows[0].cart.products.filter(product => product.uid !== productUid)

            const newTotal = getCartTotal(updatedProducts)
            const updatedCart = { total: newTotal, products: updatedProducts }

            // Update db with cart + new product
            const updateQuery = 'UPDATE orders SET cart = $1 WHERE id = $2'
            await pool.query(updateQuery, [updatedCart, id])

            // Query updated DB order
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

    if (method === "removeAll") {

        const { productUid } = body

        try {

            // Query order
            const getQuery = 'SELECT * FROM orders WHERE id = $1'
            const { rows: ordersRows } = await pool.query(getQuery, [id])

            // Reset cart
            const updatedCart = { total: 0, products: [] }

            // Update db with cart + new product
            const updateQuery = 'UPDATE orders SET cart = $1 WHERE id = $2'
            await pool.query(updateQuery, [updatedCart, id])

            // Query updated DB order
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
}

const updateOrderStatus = async (id, status) => {

    // console.log(id, status)

    try {
        const getQuery = 'SELECT * FROM orders WHERE id = $1'
        const { rows: ordersRows } = await pool.query(getQuery, [id])
        await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id])
        sentCompletedOrderMail(ordersRows[0])
        return { success: true }
    } catch (err) {
        console.error("Error updating order status:", err)
        return { error: true, msg: err }
    }
}

const updateOrderDetails = async (id, details) => {
    try {
        const getQuery = 'SELECT * FROM orders WHERE id = $1'
        const { rows: ordersRows } = await pool.query(getQuery, [id])
        await pool.query("UPDATE orders SET details = $1 WHERE id = $2", [details, id])
        sentCompletedOrderMail(ordersRows[0])
        return { success: true }
    } catch (err) {
        console.error("Error updating order status:", err)
        return { error: true, msg: err }
    }
}

export const updateOrderModel = {
    updateOrder,
    updateOrderStatus,
    updateOrderDetails,
}