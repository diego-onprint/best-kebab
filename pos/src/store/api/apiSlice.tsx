import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, ProductVariationResponse } from "../../types"

const baseUrl = import.meta.env.DEV ? "http://localhost:5173/api/" : "https://lovely-burger-pos.diegoui.com.ar/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getCategories: builder.query<{ categories: Category[]}, string | undefined>({
            query: (id) => `categories/${id}`,
            keepUnusedDataFor: 21600,
        }),
        getProductsByCategory: builder.query<{products: Product[]}, string | undefined>({
            query: (id) => `products/${id}`,
            keepUnusedDataFor: 21600,
        }),
        getProductsVariations: builder.query<ProductVariationResponse, Product["id"] | undefined>({
            query: (id) => `product-variation/${id}`,
            keepUnusedDataFor: 21600,
        }),
        getOrders: builder.query({
            query: (data) => `orders?page=${data.page}`
        }),
        getSalesReport: builder.query({
            query: (query) => `sales-reports?${query}`
        })
    })
})

export const { 
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery,
    useGetProductsVariationsQuery,
    useGetOrdersQuery, 
    useGetSalesReportQuery,
} = api