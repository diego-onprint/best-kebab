import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { Tables, Table, CartProduct, CartProductId, Product } from "../../types"

const initialState: Tables = {
    tables: [
        {
            id: 1,
            cart: { products: [], total: "0" },
            capacity: 2,
            name: "Salon 1"
        },
        {
            id: 2,
            cart: { products: [], total: "0" },
            capacity: 2,
            name: "Salon 2"
        },
        {
            id: 3,
            cart: { products: [], total: "0" },
            capacity: 4,
            name: "Salon 3"
        },
        {
            id: 4,
            cart: { products: [], total: "0" },
            capacity: 2,
            name: "Terrase 1"
        },
        {
            id: 5,
            cart: { products: [], total: "0" },
            capacity: 6,
            name: "Terrase 2"
        },
        {
            id: 6,
            cart: { products: [], total: "0" },
            capacity: 4,
            name: "Terrase"
        },
    ],
    activeTable: -1
}

const getTotal = (products: CartProduct[]) => {

    const total = products.reduce((acc, curr) => {

        let variationPrice = 0

        if (curr.variation) variationPrice = Number(curr.variation.price) * curr.qty

        return acc + Number(curr.price) * curr.qty + variationPrice

    }, 0)

    return total.toFixed(2)
}

export const tablesSlice = createSlice({
    name: "tables",
    initialState: initialState,
    reducers: {
        setActiveTable: (state, action: PayloadAction<Table["id"]>) => {
            state.activeTable = action.payload
        },
        addTableProduct: (state, action: PayloadAction<CartProduct>) => {
            const index = state.tables.findIndex((table: Table) => state.activeTable === table.id)
            const table = state.tables[index]
            table.cart.products.push(action.payload)
            table.cart.total = getTotal(table.cart.products)
        },
        removeTableProduct: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const tableIndex = state.tables.findIndex((table: Table) => state.activeTable === table.id)
            const table = state.tables[tableIndex]
            const productIndex = table.cart.products.findIndex(product => product.uid === action.payload)
            table.cart.products.splice(productIndex, 1)
            table.cart.total = getTotal(table.cart.products)
        },
        clearTableCart: (state) => {
            const tableIndex = state.tables.findIndex((table: Table) => state.activeTable === table.id)
            const table = state.tables[tableIndex]
            table.cart.products = []
            table.cart.total = getTotal(table.cart.products)
        },
    }
})

export const {
    setActiveTable,
    addTableProduct,
    removeTableProduct,
    clearTableCart,
} = tablesSlice.actions