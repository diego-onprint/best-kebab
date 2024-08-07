import { createSlice } from "@reduxjs/toolkit"
import type { OrderType, TicketType } from "../../types"

const initialState: { type: OrderType } = { 
    type: {
        value: "lieferung", 
        name: "Lieferung" 
    }
}

export const orderTypeSlice = createSlice({
    name: "orderType",
    initialState,
    reducers: {
        setOrderType: (state, action) => {
            state.type = action.payload
        },
    }
})

export const { 
    setOrderType,
} = orderTypeSlice.actions