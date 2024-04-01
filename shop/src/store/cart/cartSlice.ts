import { createSlice } from "@reduxjs/toolkit"
import type { Cart, CartProduct, CartProductId } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: Cart = {
    products: [],
    total: "0",
    totalProducts: 0,
}

const getTotal = (state: Cart) => {
    const total = state.products.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    return total.toFixed(2)
}

const getTotalProducts = (state: Cart) => {
    return state.products.reduce((acc, curr) => acc + curr.qty, 0)
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {

            state.products.push(action.payload)

            state.total = getTotal(state)
            state.totalProducts = getTotalProducts(state)
        },
        removeProduct: (state, action: PayloadAction<CartProductId>) => {
            const index = state.products.findIndex(product => product.id === action.payload)
            state.products.splice(index, 1)
            state.total = getTotal(state)
            state.totalProducts = getTotalProducts(state)
        },
        clearCart: (state) => {
            state.products = []
            state.total = getTotal(state)
        },
    },
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions