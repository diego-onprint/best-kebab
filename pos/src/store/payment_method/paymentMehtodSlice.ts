import { createSlice } from "@reduxjs/toolkit"
import type { PaymentMethod } from "../../types"

const initialState: { method: PaymentMethod } = { 
    method: {
        value: "cash", 
        name: "Barzahlung" 
    }
}

export const paymentMethodSlice = createSlice({
    name: "payment-method",
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.method = action.payload
        },
    }
})

export const { 
    setPaymentMethod,
} = paymentMethodSlice.actions