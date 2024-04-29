import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, ProductVariationResponse } from "../../types"

const baseUrl = import.meta.env.DEV ? 
"http://localhost:5173/api/" : 
"https://lovely-burger-pos.diegoui.com.ar/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
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
            query: () => "tables/"
        }),
        getCompletedOrders: builder.query({
            query: () => "orders/"
        })

/////////////////////////////////////////////////////

        // getSubCategories: builder.query<{ categories: Category[]}, string | undefined>({
        //     query: (id) => `subcategories/${id}`,
        //     keepUnusedDataFor: 21600,
        // }),
        // getProductsVariations: builder.query<ProductVariationResponse, Product["id"] | undefined>({
        //     query: (id) => `product-variation/${id}`,
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
    useGetAllProductsQuery,
    useGetProductsByCategoryQuery,
    useGetTablesDataQuery,
    // useGetSubCategoriesQuery,
    // useGetProductsVariationsQuery,
    // useGetOrdersQuery, 
    // useGetSalesReportQuery,
} = api