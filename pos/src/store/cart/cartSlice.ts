import { createSlice } from "@reduxjs/toolkit"
import type { Cart, CartProduct } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { getLocalStorageItem, isInLocalStorage, setLocalStorageItem } from "../../utils/local_storage/localStorage"

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

        // Add to accumulator the: (product price plus de subtotal from variations) by qty
        return acc + (Number(curr.price) + variationsPrice) * curr.qty 

    }, 0)
    
    return total.toFixed(2)
}

const updateCartLocalStorage = (state) => {
    setLocalStorageItem("cart", { products: [...state.products], total: state.total})
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            state.products.push(action.payload)
            state.total = getTotal(state)
            updateCartLocalStorage(state)
        },
        removeProduct: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const index = state.products.findIndex(product => product.uid === action.payload)
            state.products.splice(index, 1)
            state.total = getTotal(state)
            updateCartLocalStorage(state)
        },
        clearCart: (state) => {
            state.products = []
            state.total = getTotal(state)
            updateCartLocalStorage(state)
        },
        updateCartInitialState: (state, action) => {
            state.products = action.payload.products
            state.total = action.payload.total
        }
    },
})

export const { 
    addProduct, 
    removeProduct, 
    clearCart,
    updateCartInitialState,
} = cartSlice.actions