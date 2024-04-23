import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomerData } from "../../models/customer_data.model"
import type { TicketDataType } from "../../types"
import View from "./View"
import { OrderType } from "../../models/order_type.model"
import { useActiveOrder, useOrderNumber } from "../../hooks/useActiveOrder"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { addNewOrder, clearOrderCart, setCurrentOrder } from "../../store/orders/ordersSlice"

type PropsTypes = {
    setOpenTkwForm: Dispatch<SetStateAction<boolean>>
}

// TODO handle open this form with parameters in url instead?

const Controller = ({ setOpenTkwForm }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const currentOrder = useActiveOrder()
    const currentOrderNumber = useOrderNumber()
    const navigate = useNavigate()
    const [customerData, setCustomerData] = useState(CustomerData)
    const [orderType, setOrderType] = useState(OrderType)

    const handleForm = (e) => {
        const { name, value } = e.target
        setCustomerData({
            ...customerData,
            [name]: value
        })
    }

    const handleCancel = () => {
        setOpenTkwForm(false)
        setCustomerData(CustomerData)
        setOrderType(OrderType)
    }

    const handleOrderType = (type: TicketDataType["orderType"]) => {
        setOrderType(type)
    }

    const handleCreateTkwOrder = () => {
        const newOrder = {
            id: currentOrderNumber,
            isTkw: true,
            name: `${orderType.name} #${currentOrderNumber}`,
            cart: currentOrder.cart,
            customerData: {...customerData, orderType: orderType},
        }

        dispatch(clearOrderCart())
        dispatch(addNewOrder(newOrder))
        navigate("/takeaway")
        setTimeout(() => {
            dispatch(setCurrentOrder(currentOrderNumber))
        }, 500)
        setOpenTkwForm(false)
    }

    return (
        <View
            customerData={customerData}
            orderType={orderType}
            handleOrderType={handleOrderType}
            handleForm={handleForm}
            handleCancel={handleCancel}
            handleCreateTkwOrder={handleCreateTkwOrder}
        />
    )
}

export default Controller