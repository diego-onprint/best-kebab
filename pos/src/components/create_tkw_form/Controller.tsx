import { Dispatch, SetStateAction, useState } from "react"
import { CustomerData } from "../../models/customer_data"
import type { TicketDataType } from "../../types"
import View from "./View"

type PropsTypes = {
    setOpenTkwForm: Dispatch<SetStateAction<boolean>>
}

// TODO handle open this form with parameters in url instead?

const Controller = ({ setOpenTkwForm }: PropsTypes) => {

    const [customerData, setCustomerData] = useState({})
    const [orderType, setOrderType] = useState({
        name: "Lieferung",
        value: "delivery"
    })

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
        setOrderType({
            name: "Lieferung",
            value: "delivery"
        })
    }

    const handleOrderType = (type: TicketDataType["orderType"]) => {
        setOrderType(type)
        setCustomerData({
            ...customerData,
            orderType: type
        })
    }

    return (
        <View
            customerData={customerData}
            orderType={orderType}
            handleOrderType={handleOrderType}
            handleForm={handleForm}
            handleCancel={handleCancel}
        />
    )
}

export default Controller