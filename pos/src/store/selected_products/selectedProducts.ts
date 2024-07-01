import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: []
}

export const selectedProductsSlice = createSlice({
    name: "selected-products",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.products.push(action.payload)
        },
        removeSelectedProduct: (state, action) => {
            state.products = state.products.filter(id => id !== action.payload)
        },
        removeAllSelectedProducts: (state) => {
            state.products = []
        }
    }
})

export const { 
    setSelectedProduct,
    removeSelectedProduct,
    removeAllSelectedProducts,
} = selectedProductsSlice.actions