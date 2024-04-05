import { configureStore } from "@reduxjs/toolkit"
import { tablesSlice } from "./tables/tablesSlice"
import { cartSlice } from "./cart/cartSlice"
import { statusSlice } from "./status/statusSlice"
import { api } from "./api/apiSlice"

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        tables: tablesSlice.reducer,
        status: statusSlice.reducer,
        api: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch