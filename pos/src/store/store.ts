import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/apiSlice"
import { currentOrderSlice } from "./current_order/currentOrderSlice"
import { menusSlice } from "./menus/menusSlice"
import { productOptionsSlice } from "./product_options/productOptionsSlice"
import { notificationSlice } from "./notification/notificationSlice"
import { ticketSlice } from "./ticket/ticketSlice"
import { orderTypeSlice } from "./order_type/orderTypeSlice"
import { socketSlice } from "./socket/socketSlice"
import { paymentMethodSlice } from "./payment_method/paymentMehtodSlice"
import { selectedProductsSlice } from "./selected_products/selectedProducts"
import { ordersPageSlice } from "./orders_page/ordersPageSlice"

export const store = configureStore({
    reducer: {
        api: api.reducer,
        currentOrder: currentOrderSlice.reducer,
        menus: menusSlice.reducer,
        productOptions: productOptionsSlice.reducer,
        notification: notificationSlice.reducer,
        ticket: ticketSlice.reducer,
        orderType: orderTypeSlice.reducer,
        paymentMethod: paymentMethodSlice.reducer,
        selectedProducts: selectedProductsSlice.reducer,
        socket: socketSlice.reducer,
        ordersPage: ordersPageSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch