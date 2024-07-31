import { pool } from "../db/connection.js"
import { pagination } from "../utils/pagination.js"


const getOrdersByPage = async (page, limit, condition) => {

    if (condition === "all") {
        const { rows } = await pool.query("SELECT * FROM orders ORDER BY id DESC")
        return pagination(rows, page, limit)
    }

    const { rows } = await pool.query("SELECT * FROM orders WHERE status->>'value' = $1 ORDER BY id DESC", [condition])
    return pagination(rows, page, limit)
}

const getAllOrders = async (page, limit) => {
    const { rows } = await pool.query("SELECT * FROM orders ORDER BY id DESC")
    return rows
}



///////////////////////////////////

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
    getOrdersByPage,
    getAllOrders,

    findTablesOrders,
    findTakeawayOrders,
    findOrderById,
    updateOrderPrintedProducts,
}