import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Order } from '../types'

export const useActiveOrder = () => {
    const ordersSlice = useSelector<RootState, object>(state => state.orders)
    const order = ordersSlice.orders.find(ord => ord.id === ordersSlice.currentOrder)
    return order
}

export const useOrderNumber = () => {
    const ordersSlice = useSelector<RootState, object>(state => state.orders)
    return ordersSlice.orderNumber
}