import { createSlice } from "@reduxjs/toolkit"
import type { Cart, CartProduct } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: Cart = {
    products: [],
    total: "0"
}

const getTotal = (state: Cart) => {

    const total = state.products.reduce((acc, curr) => {

        let variationsPrice = 0

        // Add variations subtotal
        if (curr.variations.length > 0) {
            variationsPrice = curr.variations.reduce((accumulator, current) => {
                return accumulator + Number(current.price)
            }, 0)
        }

        // Add to accumulator the product price by qty plus de subtotal from variations
        return acc + Number(curr.price) * curr.qty + variationsPrice

    }, 0)
    
    return total.toFixed(2)
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            state.products.push(action.payload)
            state.total = getTotal(state)
        },
        removeProduct: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const index = state.products.findIndex(product => product.uid === action.payload)
            console.log(index)
            state.products.splice(index, 1)
            state.total = getTotal(state)
        },
        clearCart: (state) => {
            state.products = []
            state.total = getTotal(state)
        },
    },
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions