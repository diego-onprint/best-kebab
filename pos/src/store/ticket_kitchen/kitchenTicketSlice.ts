import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
    notes: ""
}

export const kitchenTicketSlice = createSlice({
    name: "kitchen-ticket",
    initialState,
    reducers: {
        addKitchenTicketProduct: (state, action: PayloadAction) => {
            state.products.push(action.payload)
        },
        removeKitchenTicketProduct: (state, action: PayloadAction) => {
            const index = state.products.findIndex(product => product.uid === action.payload.uid)
            state.products.splice(index, 1)
        },
        updateKitchenTicketNotes: (state, action: PayloadAction<string>) => {
            state.notes = action.payload
        }
    }
})

export const { 
    addKitchenTicketProduct,
    removeKitchenTicketProduct,
    updateKitchenTicketNotes,
} = kitchenTicketSlice.actions