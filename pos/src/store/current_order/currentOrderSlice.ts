import { createSlice } from "@reduxjs/toolkit"
import { CurrentOrderModel } from "../../models/current_order.model"

export const currentOrderSlice = createSlice({
    name: "current-order",
    initialState: CurrentOrderModel,
    reducers: {
        setCurrentOrderId: (state, action) => {
            state.id = action.payload
        },
        updateCurrentOrderData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { 
    setCurrentOrderId,
    updateCurrentOrderData,
} = currentOrderSlice.actions