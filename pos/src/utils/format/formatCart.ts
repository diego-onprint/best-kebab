import { Cart } from "../../types"

export const formatCart = (cart: Cart) => {

    const formattedCart = cart.products.map(product => {

        //IF VARIATIONS, CALCULATE THE TOTAL - WOOCOMMERCE DOESNT ADD AUTOMATICALLY THE VARIATION PRICE TO THE TOTAL
        if (product.variations.length > 0) {

            const variationsTotalPrice = product.variations.reduce((acc, curr) => {
                return acc + curr.price
            }, 0)

            const variationsName = product.variations.map(variation => variation.name).join("/")

            const productTotalPrice = (Number(product.price) + variationsTotalPrice) * product.qty

            return {
                name: product.name,
                product_id: product.id,
                meta_data: [
                    {
                        key: "Variations",
                        value: variationsName
                    },
                    {
                        key: "Notes",
                        value: product.notes
                    }],
                quantity: product.qty,
                total: productTotalPrice.toString()
            }
        }

        return {
            name: product.name,
            product_id: product.id,
            meta_data: [{ key: "Notes", value: product.notes }],
            quantity: product.qty,
            total: (Number(product.price) * product.qty).toString(),
        }
    })

    return formattedCart
}