// Update the order in the database and fetch updated data in pool transaction in server -
// Use response to update the local store in the front.

import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { updateCurrentOrderData } from "../store/current_order/currentOrderSlice"
import { useGetTablesDataQuery, useUpdateOrderDataMutation } from "../store/api/apiSlice"
import type { Order } from "../types"

export const useUpdateOrderInDbAndStore = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [updateOrderData, { isLoading: isUpdating }] = useUpdateOrderDataMutation()

    const updateOrder = async (updatedOrder: Order) => {

        // Update DB
        const { data: updatedCurrentOrder } = await updateOrderData(updatedOrder)

        // Update Store
        dispatch(updateCurrentOrderData(updatedCurrentOrder.data))
    }

    return { updateOrder, isUpdating }
}