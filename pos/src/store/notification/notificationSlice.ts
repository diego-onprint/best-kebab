import { createSlice } from "@reduxjs/toolkit"

export const notificationSlice = createSlice({
    name: "notification",
    initialState: { show: false, data: {}},
    reducers: {
        setNotification: (state, action) => {
            state.show = action.payload.show
            state.data = action.payload.data
        },
    }
})

export const { 
    setNotification,
} = notificationSlice.actions