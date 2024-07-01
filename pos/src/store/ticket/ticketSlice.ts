import { createSlice } from "@reduxjs/toolkit"
import type { TicketType } from "../../types"

const initialState: { type: TicketType } = { 
    type: "shop",
}

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setTicketType: (state, action) => {
            state.type = action.payload
        }
    }
})

export const { 
    setTicketType,
} = ticketSlice.actions