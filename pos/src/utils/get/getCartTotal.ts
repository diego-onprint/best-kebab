export const getCartTotal = (cart) => {
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