import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    page: 1,
    limit: 10,
    condition: "all" // all | process | ready | completed|
}

export const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setOrdersPage: (state, action) => {
            state.page = action.payload
        },
        setOrdersCondition: (state, action) => {
            state.condition = action.payload
        }
    }
})

export const { 
    setOrdersPage,
    setOrdersCondition,
} = ordersPageSlice.actions