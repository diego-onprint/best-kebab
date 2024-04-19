import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = []

export const kitchenTicketSlice = createSlice({
    name: "kitchen-ticket",
    initialState,
    reducers: {
        addKitchenTicketProduct: (state, action: PayloadAction) => {
            state.push(action.payload)
        },
        removeKitchenTicketProduct: (state, action: PayloadAction) => {
            const index = state.findIndex(product => product.uid === action.payload.uid)
            state.splice(index, 1)
        }
    }
})

export const { 
    addKitchenTicketProduct,
    removeKitchenTicketProduct,
} = kitchenTicketSlice.actions