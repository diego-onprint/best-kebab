import { pool } from "../db/connection.js"

const updateOrderFromShop = async (id, body) => {
    const client = await pool.connect()
    const cart = body.data.cart

    // console.log(id, body.data.cart.products)

    console.log(body)

    try {

        // Query order
        const getQuery = 'SELECT * FROM orders WHERE id = $1'
        const { rows: ordersRows } = await pool.query(getQuery, [id])

        // Query products data from DB
        const ids = cart.products.map(product => product.id);
        const query = 'SELECT * FROM products WHERE id = ANY($1::text[])';
        const { rows: cartProducts } = await pool.query(query, [ids]);

        const parsedCartProducts = cart.products.map(product => {
            const { price: dbProductPrice } = cartProducts.find(prod => product.id === prod.id)

            return { ...product, total: parseInt(dbProductPrice) * product.qty }
        })

        // Add products to the products in the order (if any)
        const concatProducts = [...ordersRows[0].cart.products, ...parsedCartProducts]
        const newTotal = concatProducts.reduce((acc, curr) => acc + curr.total, 0)
        const updatedCart = { total: newTotal, products: concatProducts }

        // Update db with cart + new product
        const updateQuery = 'UPDATE orders SET cart = $1 WHERE id = $2'
        await pool.query(updateQuery, [updatedCart, id])

        await client.query('COMMIT')

        return {
            success: true,
            id: id,
            details: {
                customer_data: {
                    name: body.data.customerData.name,
                    email: body.data.customerData.email,
                }
            },
            order: {
                cart: {
                    products: parsedCartProducts,
                    total: concatProducts.reduce((acc, curr) => acc + curr.total, 0)
                }
            }
        }

    } catch (err) {

        console.log(err)
        await client.query('ROLLBACK')
        return { error: true, msg: err }

    } finally {

        client.release()
    }
}

export const shopOrderModel = {
    updateOrderFromShop,
}