import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/apiSlice"
import { currentOrderSlice } from "./current_order/currentOrderSlice"
import { tablesSlice } from "./tables/tablesSlice"
import { menusSlice } from "./menus/menusSlice"
import { productOptionsSlice } from "./product_options/productOptionsSlice"


export const store = configureStore({
    reducer: {
        api: api.reducer,
        currentOrder: currentOrderSlice.reducer,
        tables: tablesSlice.reducer,
        menus: menusSlice.reducer,
        productOptions: productOptionsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch