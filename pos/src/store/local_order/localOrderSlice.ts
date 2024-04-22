// Keep track of local orders numbers (not checked out)

import { createSlice } from "@reduxjs/toolkit"

export const localOrderSlice = createSlice({
    name: "local-order-slice",
    initialState: { orderNumber: 0 },
    reducers: {
        increaseLocalOrderNumber: (state) => {
            state.orderNumber++
        }
    }
})

export const { increaseLocalOrderNumber } = localOrderSlice.actions