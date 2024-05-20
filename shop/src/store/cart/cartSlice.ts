import { createSlice } from "@reduxjs/toolkit"
import type { Cart, CartProduct, CartProductId } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { setLocalStorageItem } from "../../utils/localStorage"

const initialState: Cart = {
    products: [],
    total: "0",
    totalProducts: 0,
    table: null,
}

const getTotal = (state: Cart) => {
    const total = state.products.reduce((acc, curr) => acc + Number(curr.product_price) * curr.product_qty, 0)
    return total.toFixed(2)
}

const getTotalProducts = (state: Cart) => {
    return state.products.reduce((acc, curr) => acc + curr.product_qty, 0)
}

const updateCartLocalStorage = (state: Cart) => {
    setLocalStorageItem(
        "cart", 
        { 
            products: [...state.products], 
            total: state.total,
            totalProducts: state.totalProducts,
            tableId: state.tableId,
        }
    )
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            state.products.push(action.payload)
            state.total = getTotal(state)
            state.totalProducts = getTotalProducts(state)
            updateCartLocalStorage(state)
        },
        removeProduct: (state, action: PayloadAction<CartProductId>) => {
            const index = state.products.findIndex(product => product.product_uid === action.payload)
            state.products.splice(index, 1)
            state.total = getTotal(state)
            state.totalProducts = getTotalProducts(state)
            updateCartLocalStorage(state)
        },
        clearCart: (state) => {
            state.products = []
            state.total = 0
            state.totalProducts = 0
            updateCartLocalStorage(state)
        },
        updateCartInitialState: (state, action) => {
            state.products = action.payload.products
            state.total = action.payload.total
            state.totalProducts = action.payload.totalProducts
        },
        setTableId: (state, action: PayloadAction<string>) => {
            state.tableId = action.payload
        }
    },
})

export const { 
    addProduct, 
    removeProduct, 
    clearCart, 
    updateCartInitialState,
    setTableId, 
} = cartSlice.actions