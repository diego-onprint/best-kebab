import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product, Order, CompletedOrder } from "../../types";

// PROD
const baseUrl = "https://demo-pos-back.smart-pos.ch/api/"

// DEV
// const baseUrl = "http://localhost:8083/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
        // credentials: "include"
    }),
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
            query: () => "orders/tables/",
            keepUnusedDataFor: 0,
        }),
        getTakeawayOrdersData: builder.query({
            query: () => "orders/takeaway/",
            keepUnusedDataFor: 0,
        }),
        getOrderDataById: builder.query({
            query: (id) => `orders/${id}`,
        }),
        updateOrderData: builder.mutation<Order, Order>({
            query(data) {
                const { orderId, ...patch } = data
                return {
                    url: `update-order/${orderId}`,
                    method: "PATCH",
                    body: patch,
                }
            },
            async onQueryStarted({ orderId }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // Revalidate order cached data on order update
                    dispatch(api.util.upsertQueryData('getOrderDataById', orderId, data))
                } catch { 
                    console.log("Error updating cache")
                }
            },
        }),
        updateOrderStatus: builder.mutation({
            query(data) {
                const {orderId, ...status} = data
                 return {
                    url: `update-order/order-status/${orderId}`,
                    method: "PATCH",
                    body: status,
                 }
            }
        }),
        updateOrderPrintedProducts: builder.mutation({
            query(data) {
                const { orderId, ...patch } = data
                return {
                    url: `orders/${orderId}`,
                    method: "PATCH",
                    body: patch
                }
            }
        }),
        createNewTkwOrder: builder.mutation({
            query(data) {
                return {
                    url: "new-order/",
                    method: "POST",
                    body: data,
                }
            }
        }),
        updateTkwOrderClientDetails: builder.mutation({
            query(data) {
                const { id, ...patch} = data
                console.log("here", id, patch)
                return {
                    url: `new-order/${id}`,
                    method: "PATCH",
                    body: patch,
                }
            }
        }),
        removeTkwOrder: builder.mutation({
            query(id) {
                return {
                    url: `tkw-order/${id}`,
                    method: "DELETE",
                }
            }
        }),
        createNewProduct: builder.mutation({
            query(data) {
                return {
                    url: "product/",
                    method: "POST",
                    body: data,
                }
            }
        }),
        updateProduct: builder.mutation({
            query(data) {
                const { id, ...patch } = data
                return {
                    url: `product/${id}`,
                    method: "PATCH",
                    body: patch,
                }
            }
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `product/${id}`,
                    method: "DELETE",
                }
            }
        }),
        createNewCategory: builder.mutation({
            query(data) {
                return {
                    url: "categories/",
                    method: "POST",
                    body: data,
                }
            }
        }),
        deleteCategory: builder.mutation({
            query(id) {
                return {
                    url: `categories/${id}`,
                    method: "DELETE",
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
        updateCompletedOrderStatus: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/completed-orders/update-status/${id}`,
                    method: "PATCH",
                    body,
                }
            }
        }),
        deleteOldDeletedOrders: builder.mutation({
            query() {
                return {
                    url: `/completed-orders/delete-old-orders/`,
                    method: "DELETE"
                }
            }
        }),
        getCompletedOrders: builder.query({
            query: () => "completed-orders/",
            keepUnusedDataFor: 0,
        }),
        getCompletedOrdersByPage: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: "completed-orders/",
                    params: { page, limit }
                }
            },
            keepUnusedDataFor: 0
        }),
        getCompletedOrderById: builder.query({
            query: (id) => `completed-orders/${id}`,
            keepUnusedDataFor: 0,
        }),
        deleteCompletedOrder: builder.mutation({
            query(id) {
                return {
                    url: `completed-orders/${id}`,
                    method: "DELETE",
                }
            }
        }),
        updateCompletedOrderDetails: builder.mutation({
            query(data) {
                const { id, ...patch} = data
                return {
                    url: `completed-orders/details/${id}`,
                    method: "PATCH",
                    body: patch,
                }
            }
        }),
        updateCompletedOrderProducts: builder.mutation({
            query(data) {
                const { orderId, ...patch} = data
                console.log(data)
                return {
                    url: `completed-orders/products/${orderId}`,
                    method: "PATCH",
                    body: patch,
                }
            }
        }),
        getWeekReport: builder.query({
            query: () => "reports/current-week",
            keepUnusedDataFor: 0,
        }),
        getCurrentDayReport: builder.query({
            query: () => "reports/current-day",
            keepUnusedDataFor: 0,
        }),
        getLastMonthReport: builder.query({
            query: () => "reports/last-month",
            keepUnusedDataFor: 0,
        }),
        getLastYearReport: builder.query({
            query: () => "reports/last-year",
            keepUnusedDataFor: 0,
        }),
        getCustomDatesReport: builder.mutation({
            query(data) {
                return {
                    url: `/reports/custom`,
                    method: "POST",
                    body: data,
                }
            }
        }),
        login: builder.mutation({
            query(data) {
                return {
                    url: "login/",
                    method: "POST",
                    body: data,
                }
            }
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useGetProductsByCategoryQuery,
    useGetTablesDataQuery,
    useGetTakeawayOrdersDataQuery,
    useGetOrderDataByIdQuery,
    useUpdateOrderDataMutation,
    useUpdateOrderStatusMutation,
    useUpdateOrderPrintedProductsMutation,
    useCreateNewTkwOrderMutation,
    useUpdateTkwOrderClientDetailsMutation,
    useCreateNewCompletedOrderMutation,
    useCreateNewProductMutation,
    useUpdateProductMutation,
    useRemoveTkwOrderMutation,
    useDeleteProductMutation,
    useCreateNewCategoryMutation,
    useDeleteCategoryMutation,
    useGetCompletedOrdersQuery,
    useGetCompletedOrdersByPageQuery,
    useGetCompletedOrderByIdQuery,
    useDeleteCompletedOrderMutation,
    useUpdateCompletedOrderDetailsMutation,
    useUpdateCompletedOrderProductsMutation,
    useDeleteOldDeletedOrdersMutation,
    useUpdateCompletedOrderStatusMutation,
    useGetCurrentDayReportQuery,
    useGetWeekReportQuery,
    useLazyGetWeekReportQuery,
    useLazyGetLastMonthReportQuery,
    useLazyGetLastYearReportQuery,
    useGetCustomDatesReportMutation,
    useLoginMutation,
} = api