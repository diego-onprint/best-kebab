import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { Order } from "../../types"

const initialState: { tables: Order[] } = { tables: [] } 

export const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        updateTables: (state, action: PayloadAction<Order[]>) => {
            state.tables = action.payload
        }
    }
})

export const { updateTables } = tablesSlice.actions