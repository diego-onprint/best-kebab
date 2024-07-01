import { createSlice } from "@reduxjs/toolkit"

export const currentOrderSlice = createSlice({
    name: "current-order",
    initialState: { currentOrderId: null },
    reducers: {
        setCurrentOrder: (state, action) => {
            state.currentOrderId = action.payload
        },
    }
})

export const { 
    setCurrentOrder,
} = currentOrderSlice.actions