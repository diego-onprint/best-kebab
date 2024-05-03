import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types"

const initialState: { currentSelectedProduct: Product } | null = {
    currentSelectedProduct: null,
}

export const productOptionsSlice = createSlice({
    name: "product-options",
    initialState,
    reducers: {
        setCurrentSelectedProduct: (state, action: PayloadAction<Product>) => {
            state.currentSelectedProduct = action.payload
        },
    }
})

export const { setCurrentSelectedProduct } = productOptionsSlice.actions