import { configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./cart/cartSlice"
// import { api } from "./api/apiSlice"

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        // api: api.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch