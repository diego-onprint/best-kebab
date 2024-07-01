import { pool } from "../db/connection.js"


const findTablesOrders = async () => {
    const query = "SELECT * FROM orders WHERE is_table = true ORDER BY id ASC "
    const { rows } = await pool.query(query)
    return rows
}

const findTakeawayOrders = async () => {
    const query = "SELECT * FROM orders WHERE is_tkw = true ORDER BY id DESC"
    const { rows } = await pool.query(query)
    return rows
}

const findOrderById = async (id) => {
    const query = "SELECT * FROM orders WHERE id = $1"
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const updateOrderPrintedProducts = async (id, selectedProducts) => {

    try {

        const order = await findOrderById(id)

        const updatedProducts = order.cart.products.map(product => {
            if (selectedProducts.includes(product.uid)) {
                return { ...product, wasPrinted: true }
            }
            return product
        })

        const updatedCart = { ...order.cart, products: updatedProducts }

        // Update db with cart + updated products
        const updateQuery = 'UPDATE orders SET cart = $1 WHERE id = $2'
        await pool.query(updateQuery, [updatedCart, id])
        return { success: true }

    } catch (err) {

        console.log(err)
        return { error: true, msg: err }
    }
}

export const ordersModel = {
    findTablesOrders,
    findTakeawayOrders,
    findOrderById,
    updateOrderPrintedProducts,
}