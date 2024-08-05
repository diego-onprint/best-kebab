import { useRef } from "react"
import { useCreateNewOrderMutation } from "../../store/api/apiSlice"
import Spinner from "../common/spinner/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { setCurrentOrder } from "../../store/current_order/currentOrderSlice"
import socket from "../../socket"
import useRefetchOrders from "../../hooks/useRefetchOrders"
import useRefetchOrderById from "../../hooks/useRefetchOrderById"

const CustomerDataModel = {
    name: "",
    surname: "Lieferung/Abholung",
    address: "",
    city: "Zurich",
    postcode: "",
    phone: "",
    email: "",
    notes: ""
}

const NewOrderForm = () => {

    const dispatch = useDispatch<AppDispatch>()
    const customerData = useRef(CustomerDataModel)
    const { page, limit, condition } = useSelector(state => state.ordersPage)
    const [createNewOrder, { isLoading }] = useCreateNewOrderMutation()
    const { refetchOrdersByPage } = useRefetchOrders()
    const { refetchOrderById } = useRefetchOrderById()

    const handleForm = (e) => customerData.current[e.target.name] = e.target.value

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createNewOrder(customerData.current)
            // Prevent cached data if order id matches deleted order
            dispatch(setCurrentOrder(response.data.id))
            refetchOrderById(response.data.id)
            refetchOrdersByPage({ page, limit, condition})
            socket.emit("order-status-updated", { success: true })
            e.target.reset()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-1">
                <input
                    type="text"
                    name="name"
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Vorname"
                />
                <input
                    type="text"
                    name="surname"
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Nachname"
                />
            </div>
            <input
                type="text"
                name="address"
                onChange={handleForm}
                className="input-field"
                placeholder="Strasse, Nr."
            />
            <div className="flex gap-1">
                <input
                    type="text"
                    name="city"
                    onChange={handleForm}
                    className="input-field"
                    placeholder="ORT"
                />
                <input
                    type="text"
                    name="postcode"
                    onChange={handleForm}
                    className="input-field"
                    placeholder="PLZ"
                />
            </div>
            <input
                type="text"
                name="phone"
                onChange={handleForm}
                className="input-field"
                placeholder="Telefon"
            />
            <input
                type="email"
                name="email"
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
            <button type="submit" className="primary-button flex gap-2 items-center">
                {
                    !isLoading ?
                    <>
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <span>Neue Order erstellen</span>
                    </> :
                    <Spinner color="text-zinc-500" />
                }
            </button>
        </form>
    )
}

export default NewOrderForm