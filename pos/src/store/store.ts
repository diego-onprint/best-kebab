import { configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./cart/cartSlice"
import { statusSlice } from "./status/statusSlice"
import { api } from "./api/apiSlice"
import { ticketSlice } from "./ticket/ticketSlice"
import { ordersSlice } from "./orders/ordersSlice"
import { currentOrderSlice } from "./current_order/currentOrderSlice"

export const store = configureStore({
    reducer: {
        api: api.reducer,
        currentOrder: currentOrderSlice.reducer,
        cart: cartSlice.reducer,
        orders: ordersSlice.reducer,
        status: statusSlice.reducer,
        ticket: ticketSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch