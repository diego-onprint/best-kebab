import { CartProduct } from "../../types"

export const getCartTotal = (orderProducts: CartProduct[]) => {
    const total  = orderProducts.reduce((acc, curr) => {
        return acc + curr.product_price * curr.product_qty
    }, 0)

    return total.toFixed(2)
}