import { createSlice } from "@reduxjs/toolkit"
import type { Cart, CartProduct, CartProductId } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { setLocalStorageItem } from "../../utils/localStorage"
import { calculatePercentage } from "../../utils/calculatePercentage"

const initialState: Cart = {
    products: [],
    tip: { percentage: 0, total: "0" },
    shipping_fee: 0,
    subtotal: "0",
    total: 0,
    totalProducts: 0,
    tableId: "",
}

const getTotal = (state: Cart) => {
    const total = state.products.reduce((acc, curr) => {
        let variationsTotal = 0

        if (curr.variations.length > 0) {
            variationsTotal = curr.variations.reduce((acc, curr) => {
                return acc + curr.option_price
            }, 0)
        }

        return acc + curr.total + variationsTotal
    }, 0)
    
    return total.toFixed(2)
}

const getTotalProducts = (state: Cart) => {
    return state.products.reduce((acc, curr) => acc + curr.qty, 0)
}

const getTipAmount = (subtotal, tipPercentage) => {
    return calculatePercentage(subtotal, tipPercentage).toFixed(2)
}

const updateCartLocalStorage = (state: Cart) => {
    setLocalStorageItem(
        "cart",
        {
            products: [...state.products],
            tip: { percentage: state.tip.percentage, total: state.tip.total },
            shipping_fee: state.shipping_fee,
            subtotal: state.subtotal,
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
            const subtotal = getTotal(state)
            state.subtotal = subtotal
            const tipTotal = getTipAmount(parseFloat(subtotal), state.tip.percentage)
            state.tip.total = tipTotal
            state.total = parseFloat(subtotal) + state.shipping_fee + parseFloat(tipTotal)
            state.totalProducts = getTotalProducts(state)
            updateCartLocalStorage(state)
        },
        removeProduct: (state, action: PayloadAction<CartProductId>) => {
            const index = state.products.findIndex(product => product.uid === action.payload)
            state.products.splice(index, 1)
            const subtotal = getTotal(state)
            state.subtotal = subtotal
            const tipTotal = getTipAmount(parseFloat(subtotal), state.tip.percentage)
            state.tip.total = tipTotal
            state.total = parseFloat(subtotal) + state.shipping_fee + parseFloat(tipTotal)
            state.totalProducts = getTotalProducts(state)
            updateCartLocalStorage(state)
        },
        clearCart: (state) => {
            state.products = []
            state.tip.percentage = 0
            state.tip.total = 0
            state.shipping_fee = 0
            state.subtotal = 0
            state.total = 0
            state.totalProducts = 0
            updateCartLocalStorage(state)
        },
        updateCartInitialState: (state, action) => {
            state.products = action.payload.products
            state.tip = { percentage: action.payload.tip.percentage, total: action.payload.tip.total }
            state.shipping_fee = action.payload.shipping_fee
            state.subtotal = action.payload.total
            state.total = action.payload.total
            state.totalProducts = action.payload.totalProducts
        },
        updateCartTip: (state, action) => {
            const newPercentage = action.payload
            state.tip.percentage = newPercentage
            const tipTotal = getTipAmount(parseFloat(state.subtotal), newPercentage)
            state.tip.total = tipTotal
            state.total = parseFloat(state.subtotal) + state.shipping_fee + parseFloat(tipTotal)
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
    updateCartTip,
    setTableId,
} = cartSlice.actions