import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, ProductVariationResponse } from "../../types"

const baseUrl = import.meta.env.DEV ?
    "http://localhost:5173/api/" :
    "https://lovely-burger-pos.diegoui.com.ar/api/"

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
        updateOrderData: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `order/${id}`,
                    method: "PUT",
                    body,
                }
            }
        }),
        getCompletedOrders: builder.query({
            query: () => "completed-orders/"
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useGetProductsByCategoryQuery,
    useGetTablesDataQuery,
    useGetOrderDataByIdQuery,
    useUpdateOrderDataMutation,
    // useGetSubCategoriesQuery,
    // useGetProductsVariationsQuery,
    // useGetOrdersQuery, 
    // useGetSalesReportQuery,
} = api