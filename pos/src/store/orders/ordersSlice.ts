import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { setLocalStorageItem } from "../../utils/local_storage/localStorage"
import type { CartProduct, Order } from "../../types"
import { OrdersEmptyState } from "../../models/orders.model"

const initialState = {
    orders: OrdersEmptyState,
    currentOrder: -1,
    orderNumber: 0,
}

const getTotal = (products) => {

    const total = products.reduce((acc, curr) => {

        let variationsPrice = 0

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

const updateOrdersLocalStorage = (state) => {
    setLocalStorageItem("orders", { 
        orders: [...state.orders], 
        orderNumber: state.orderNumber,
        currentOrder: -1,
    })
}

export const ordersSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {
        setCurrentOrder: (state, action: PayloadAction<Order["id"]>) => {
            state.currentOrder = action.payload
        },
        addOrderProduct: (state, action: PayloadAction<CartProduct>) => {
            const orderIndex = state.orders.findIndex((order) => state.currentOrder === order.id)
            const order = state.orders[orderIndex]
            order.cart.products.push(action.payload)
            order.cart.total = getTotal(order.cart.products)
            updateOrdersLocalStorage(state)
        },
        removeOrderProduct: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const orderIndex = state.orders.findIndex((order) => state.currentOrder === order.id)
            const order = state.orders[orderIndex]
            const productIndex = order.cart.products.findIndex(product => product.uid === action.payload)
            order.cart.products.splice(productIndex, 1)
            order.cart.total = getTotal(order.cart.products)
            updateOrdersLocalStorage(state)
        },
        clearOrderCart: (state) => {
            const orderIndex = state.orders.findIndex((order) => order.id === state.currentOrder)
            const order = state.orders[orderIndex]
            order.cart.products = []
            order.cart.total = "0"
            updateOrdersLocalStorage(state)
        },
        updateOrdersInitialState: (state, action) => {
            // state.orders = action.payload
        }
    }
})

export const {
    setCurrentOrder,
    addOrderProduct,
    removeOrderProduct,
    clearOrderCart,
    updateOrdersInitialState,
} = ordersSlice.actions