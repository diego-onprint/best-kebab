import { useState, useRef } from 'react'
import { useGetCompletedOrderByIdQuery, useGetTablesDataQuery, useUpdateCompletedOrderProductsMutation } from '../store/api/apiSlice'
import { createTimestamp } from '../utils/create/createTimestamp'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useUpdateOrderDataMutation } from '../store/api/apiSlice'
import type { Product, CurrentOrder } from '../types'
import useRefetchOrderById from './useRefetchOrderById'

const useProductActions = () => {

    const { currentOrderId, completedOrderToEditId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { currentSelectedProduct: product } = useSelector<RootState, { currentSelectedProduct: Product }>(state => state.productOptions)
    const [productQty, setProductQty] = useState(1)
    const [productVariations, setProductVariations] = useState([])
    const productNotes = useRef(null)
    const [updateOrderData, { isLoading: isUpdating }] = useUpdateOrderDataMutation()
    const [updateCompletedOrderProducts] = useUpdateCompletedOrderProductsMutation()
    const { refetchCompletedOrderById } = useRefetchOrderById()
    const { refetch } = useGetTablesDataQuery()

    const addProduct = async () => {

        const timestamp = createTimestamp()

        /* TODO add type */
        const productData = {
            id: product.id,
            uid: product.id + timestamp,
            qty: productQty,
            variations: productVariations,
            notes: productNotes.current.value,
        }

        if (currentOrderId) {
            await updateOrderData({ orderId: currentOrderId, method: "add", productData: productData })
        }
    }

    const removeProduct = async (productUid) => {
        if (currentOrderId) {
            await updateOrderData({ orderId: currentOrderId, method: "remove", productUid })
            // Refetch tables data to show unchecked when all products deleted and user is in tables page
            refetch()
        }
    }

    const removeAllProducts = async () => {
        if (currentOrderId) {
            await updateOrderData({ orderId: currentOrderId, method: "removeAll" })
            refetch()
        }
    }

    return {
        productQty,
        setProductQty,
        productVariations,
        setProductVariations,
        productNotes,
        addProduct,
        removeProduct,
        removeAllProducts,
        isUpdating,
    }
}

export default useProductActions