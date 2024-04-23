import { configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./cart/cartSlice"
import { statusSlice } from "./status/statusSlice"
import { api } from "./api/apiSlice"
import { ticketSlice } from "./ticket/ticketSlice"
import { kitchenTicketSlice } from "./ticket_kitchen/kitchenTicketSlice"
import { ordersSlice } from "./orders/ordersSlice"

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        orders: ordersSlice.reducer,
        status: statusSlice.reducer,
        api: api.reducer,
        ticket: ticketSlice.reducer,
        kitchenTicket: kitchenTicketSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch