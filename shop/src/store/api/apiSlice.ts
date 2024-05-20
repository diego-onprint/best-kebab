import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, ProductVariationResponse } from "../../types"

// Prod
const baseUrl = import.meta.env.DEV
  ? "https://demo-pos-back.smart-pos.ch/api/"
  : "https://demo-pos-back.smart-pos.ch/api/";

// DEV
// const baseUrl = import.meta.env.DEV ? 
//     "http://localhost:8082/api/" : 
//     "https://ceviche-back.qrbestellung.ch/api/"

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
    })
})

export const { 
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useUpdateOrderDataMutation,
    useGetOrderDataByIdQuery,
} = api