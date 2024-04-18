import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { TicketDataType, PaymentOptions, OrderTypes } from "../../types"

const initialState: TicketDataType = { 
    paymentMethod: "kasse",
    orderType: "delivery" // Can be "delivery" (tax 2.5%), "takeaway" (tax 2.5%), or "onsite" (tax 8.1%)
}

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: initialState,
    reducers: {
        setPaymentMethod: (state, action: PayloadAction<PaymentOptions>) => {
            state.paymentMethod = action.payload
        },
        setOrderType: (state, action: PayloadAction<OrderTypes>) => {
            state.orderType = action.payload
        },
    }
})

export const { setPaymentMethod, setOrderType } = ticketSlice.actions