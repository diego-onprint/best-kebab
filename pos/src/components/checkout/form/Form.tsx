/*
    TODO unify this form with the form in the cart?
    TODO handle errors
    TODO handle notifications (data updated)
*/

import { useState } from "react"
import Spinner from "../../common/spinner/Spinner"
import toast from "react-hot-toast"
import { useGetOrderDataByIdQuery, useUpdateTkwOrderClientDetailsMutation } from "../../../store/api/apiSlice"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import type { CurrentOrder } from "../../../types"

const Form = () => {

    const { currentOrderId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { data: order, refetch } = useGetOrderDataByIdQuery(currentOrderId)
    const [customerData, setCustomerData] = useState(order.details.customer_data)
    const [updateClientDetails, { isLoading: isUpdating }] = useUpdateTkwOrderClientDetailsMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await updateClientDetails({ id: order.id, customerData })
            toast.success("Kundendetails updated")
            refetch()

        } catch (err) {
            console.log(err)
        }
    }
    
    const handleForm =  (e) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h3 className="font-semibold">Kundendetails</h3>
            <div className="flex gap-1">
                <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Vorname"
                />
                <input
                    type="text"
                    name="surname"
                    value={customerData.surname}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Nachname"
                />
            </div>
            <input
                type="text"
                name="address"
                value={customerData.address}
                onChange={handleForm}
                className="input-field"
                placeholder="Strasse, Nr."
            />
            <div className="flex gap-1">
                <input
                    type="text"
                    name="city"
                    value={customerData.city}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="ORT"
                />
                <input
                    type="text"
                    name="postcode"
                    value={customerData.postcode}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="PLZ"
                />
            </div>
            <input
                type="text"
                name="phone"
                value={customerData.phone}
                onChange={handleForm}
                className="input-field"
                placeholder="Telefon"
            />
            <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleForm}
                className="input-field"
                placeholder="Email"
            />
            <textarea
                rows={2}
                name="notes"
                placeholder="Bemerkung"
                className="flex-1 input-field resize-none rounded-md"
                onChange={handleForm}
            />
            <button className="primary-button">
                {
                    !isUpdating ?
                    "Update details" :
                    <Spinner color="text-zinc-500" />
                }
            </button>
        </form>
    )
}

export default Form