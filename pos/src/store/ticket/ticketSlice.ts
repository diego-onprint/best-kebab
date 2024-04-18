import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { TicketDataType } from "../../types"

const initialState: TicketDataType = { 
    paymentMethod: {
        name: "Barzahlung",
        value: "cash"
    },
    orderType: {
        name: "Lieferung",
        value: "delivery"
    }
}

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: initialState,
    reducers: {
        setPaymentMethod: (state, action: PayloadAction<TicketDataType["paymentMethod"]>) => {
            state.paymentMethod = action.payload
        },
        setOrderType: (state, action: PayloadAction<TicketDataType["orderType"]>) => {
            state.orderType = action.payload
        },
    }
})

export const { setPaymentMethod, setOrderType } = ticketSlice.actions