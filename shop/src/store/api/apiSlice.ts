import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, ProductVariationResponse } from "../../types"

const baseUrl = import.meta.env.DEV ? "http://localhost:8082/api/" : "https://lovely-burger-pos.diegoui.com.ar/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getCategories: builder.query<{ categories: Category[]}, string | undefined>({
            query: () => "categories/",
            keepUnusedDataFor: 21600,
        }),
        getProductsByCategory: builder.query<{products: Product[]}, string | undefined>({
            query: (id) => `products/${id}`,
            keepUnusedDataFor: 21600,
        }),
        getProductById: builder.query({
            query: (id) => `product/${id}`,
            keepUnusedDataFor: 21600,
        }),
        // getSubCategories: builder.query<{ categories: Category[]}, string | undefined>({
        //     query: (id) => `subcategories/${id}`,
        //     keepUnusedDataFor: 21600,
        // }),
        // getOrders: builder.query({
        //     query: (data) => `orders?page=${data.page}`
        // }),
        // getSalesReport: builder.query({
        //     query: (query) => `sales-reports?${query}`
        // })
    })
})

export const { 
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    // useGetSubCategoriesQuery,
    // useGetOrdersQuery, 
    // useGetSalesReportQuery,
} = api