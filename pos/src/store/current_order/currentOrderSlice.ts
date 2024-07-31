import { createSlice } from "@reduxjs/toolkit"

export const currentOrderSlice = createSlice({
    name: "current-order",
    initialState: { 
        currentOrderId: null,
    },
    reducers: {
        setCurrentOrder: (state, action) => {
            // If completed order selected, reset it and set current order
            console.log("HERE.....", action.payload)
            state.currentOrderId = action.payload
        },
        setCompletedOrderToEdit: (state, action) => {
            // Reset current order and set the completed to edit
            if (state.currentOrderId) state.currentOrderId = null
        }
    }
})

export const { 
    setCurrentOrder,
    setCompletedOrderToEdit,
} = currentOrderSlice.actions