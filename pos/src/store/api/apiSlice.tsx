import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product, Order, CompletedOrder } from "../../types";

// PROD
const baseUrl = "https://demo-pos-back.smart-pos.ch/api/"

// DEV
// const baseUrl = "http://localhost:8083/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => "/products",
            keepUnusedDataFor: 21600,
        }),
        getCategories: builder.query<Category[], void>({
            query: () => `categories/`,
            keepUnusedDataFor: 21600,
        }),
        getProductsByCategory: builder.query<Product[], string | undefined>({
            query: (id) => `products/${id}`,
            keepUnusedDataFor: 21600,
        }),
        getTablesData: builder.query({
            query: () => "tables/",
            keepUnusedDataFor: 0,
        }),
        getOrderDataById: builder.query({
            query: (id) => `order/${id}`,
            keepUnusedDataFor: 0,
        }),
        updateOrderData: builder.mutation<Order, Order>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `order/${id}`,
                    method: "PUT",
                    body,
                }
            }
        }),
        createNewCompletedOrder: builder.mutation<CompletedOrder, { data: object }>({
            query(data) {
                return {
                    url: `checkout/`,
                    method: "POST",
                    body: data,
                }
            }
        }),
        getCompletedOrders: builder.query({
            query: () => "completed-orders/",
            keepUnusedDataFor: 0,
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useGetProductsByCategoryQuery,
    useGetTablesDataQuery,
    useGetPersonsDataQuery,
    useGetOrderDataByIdQuery,
    useUpdateOrderDataMutation,
    useCreateNewCompletedOrderMutation,
    useGetCompletedOrdersQuery,
} = api