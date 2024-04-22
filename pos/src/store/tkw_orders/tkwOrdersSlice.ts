import { createSlice } from "@reduxjs/toolkit"

export const tkwOrdersSlice = createSlice({
    name:"tkw-orders-slice",
    initialState: [],
    reducers: {
        addNewTkwOrder: (state, action) => {
            console.log(action.payload)
            state.push(action.payload)
        }
    }
})

export const {
    addNewTkwOrder
} = tkwOrdersSlice.actions