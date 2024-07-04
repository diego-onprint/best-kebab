import { createSlice } from "@reduxjs/toolkit"

export const currentOrderSlice = createSlice({
    name: "current-order",
    initialState: { 
        currentOrderId: null,
        completedOrderToEditId: null,
    },
    reducers: {
        setCurrentOrder: (state, action) => {
            // If completed order selected, reset it and set current order
            if (state.completedOrderToEditId) state.completedOrderToEditId = null
            state.currentOrderId = action.payload
        },
        setCompletedOrderToEdit: (state, action) => {
            // Reset current order and set the completed to edit
            if (state.currentOrderId) state.currentOrderId = null
            state.completedOrderToEditId = action.payload
        }
    }
})

export const { 
    setCurrentOrder,
    setCompletedOrderToEdit,
} = currentOrderSlice.actions