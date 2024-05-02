import { configureStore } from "@reduxjs/toolkit"
import { statusSlice } from "./status/statusSlice"
import { api } from "./api/apiSlice"
import { ordersSlice } from "./orders/ordersSlice"
import { currentOrderSlice } from "./current_order/currentOrderSlice"
import { tablesSlice } from "./tables/tablesSlice"
import { menusSlice } from "./menus/menusSlice"


export const store = configureStore({
    reducer: {
        api: api.reducer,
        currentOrder: currentOrderSlice.reducer,
        tables: tablesSlice.reducer,
        menus: menusSlice.reducer,

        orders: ordersSlice.reducer,
        status: statusSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch