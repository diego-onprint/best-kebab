import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { setLocalStorageItem } from "../../utils/localStorage"
import { TablesEmptyState } from "../../models/tables.model"
import type { Tables, Table, CartProduct } from "../../types"

const initialState: Tables = {
    tables: TablesEmptyState,
    activeTable: -1
}

const getTotal = (products: CartProduct[]) => {

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

const updateTablesLocalStorage = (state) => {
    setLocalStorageItem("tables", [...state.tables])
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
            updateTablesLocalStorage(state)
        },
        removeTableProduct: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const tableIndex = state.tables.findIndex((table: Table) => state.activeTable === table.id)
            const table = state.tables[tableIndex]
            const productIndex = table.cart.products.findIndex(product => product.uid === action.payload)
            table.cart.products.splice(productIndex, 1)
            table.cart.total = getTotal(table.cart.products)
            updateTablesLocalStorage(state)
        },
        clearTableCart: (state) => {
            const tableIndex = state.tables.findIndex((table: Table) => state.activeTable === table.id)
            const table = state.tables[tableIndex]
            table.cart.products = []
            table.cart.total = "0"
            updateTablesLocalStorage(state)
        },
        updateTablesInitialState: (state, action) => {
            state.tables = action.payload
        }
    }
})

export const {
    setActiveTable,
    addTableProduct,
    removeTableProduct,
    clearTableCart,
    updateTablesInitialState,
} = tablesSlice.actions