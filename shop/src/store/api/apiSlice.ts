import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Prod
// const baseUrl = "https://best-kebab-server.smart-pos.ch/api/"

// DEV
const baseUrl = "http://localhost:8108/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getCategories: builder.query<{ categories }, string | undefined>({
            query: () => "categories/",
            keepUnusedDataFor: 21600,
        }),
        getAllProducts: builder.query({
            query: () => "products/",
            keepUnusedDataFor: 21600,
        }),
        getProductsByCategory: builder.query<{products}, string | undefined>({
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
        createNewShopOrder: builder.mutation({
            query(data) {
                return {
                    url: "new-shop-order/",
                    method: "POST",
                    body: data,
                }
            }
        }),
        updateOrderData: builder.mutation<Order, Order>({
            query(data) {
                const { table, ...patch } = data

                return {
                    url: `shop-order/${table}`,
                    method: "PATCH",
                    body: patch,
                }
            }
        }),
        // callStaff: builder.mutation({
        //     query(data) {
        //         console.log(data)
        //         // const { tableId, ...patch } = data
        //         // return {
        //         //     url: `call-staff/${tableId}`,
        //         //     method: "POST",
        //         // }
        //     }
        // }),
    })
})

export const { 
    useGetCategoriesQuery, 
    useGetAllProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetOrderDataByIdQuery,
    useUpdateOrderDataMutation,
    useCreateNewShopOrderMutation,
    // useCallStaffMutation,
} = api