import { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store/store"
import { increaseLocalOrderNumber } from "../../../store/local_order/localOrderSlice"
import type { CartProduct } from "../../../types"
import { addNewTkwOrder } from "../../../store/tkw_orders/tkwOrdersSlice"

type PropsTypes = {
    buttonStyle: string
    children: ReactNode
}

const ButtonCreateTkwOrder = ({ data, buttonStyle, children }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const currentLocalOrder = useSelector<RootState, {orderNumber: number}>(state => state.localOrder)
    const cartProducts = useSelector<RootState, CartProduct[]>(state => state.cart.products)

    const handleAddTakeawayOrder = () => {

        const tkwOrderData = {
            products: cartProducts,
            orderData: data,
            orderNumber: currentLocalOrder.orderNumber,
        }

        // create new order
        dispatch(addNewTkwOrder(tkwOrderData))

        // increase the orders numbers
        dispatch(increaseLocalOrderNumber())
    }

    return (
        <button onClick={handleAddTakeawayOrder} className={buttonStyle}>
            {children}
        </button>
    )
}

export default ButtonCreateTkwOrder