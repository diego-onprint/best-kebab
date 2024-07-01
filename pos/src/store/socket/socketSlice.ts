import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const socketSlice = createSlice({
    name: "socket",
    initialState: { status: false },
    reducers: {
        setSocketStatus: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload
        },
    }
})

export const { 
    setSocketStatus,
} = socketSlice.actions