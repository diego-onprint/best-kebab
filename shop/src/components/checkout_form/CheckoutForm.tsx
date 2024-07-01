import { useEffect, useState } from "react"
import Spinner from "../common/spinner/Spinner"
import { clearCart } from "../../store/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { useCreateNewShopOrderMutation } from "../../store/api/apiSlice"
import toast from "react-hot-toast"
import { useNavigate, useSearchParams } from "react-router-dom"
import useParam from "../../hooks/useParam"
import { urlSearchParamsToObject } from "../../utils/urlSearchParamsToObject"

const CustomerDataModel = {
  name: "",
  surname: "",
  address: "",
  city: "",
  postcode: "",
  phone: "",
  email: "",
  notes: "",
}

const DeliveryDataModel = {
  order_type: { name: "Abholung", value: "abholung" },
  time: "",
  mode: "ASAP",
  payment_method: { name: "Barzahlung", value: "cash" },
  table: ""
}

const Form = () => {

  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate()
  const table = useParam("table")
  const [searchParams] = useSearchParams()
  const [createNewShopOrder, { isLoading }] = useCreateNewShopOrderMutation()
  const [customerData, setCustomerData] = useState(CustomerDataModel)
  const [deliveryData, setDeliveryData] = useState(DeliveryDataModel)


  const handleForm = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    // Add zod validations
    if (customerData.name === "" || customerData.email === "") {
      return toast.error('Missing name/email')
    }

    try {

      const parsedData = {
        cart,
        customerData,
        deliveryData,
      }

      const response = await createNewShopOrder(parsedData)

      if (response.data.error) {
        toast.error("Error placing order")
      }

      if (response.data.success) {

        toast.success('Bestellung gesendet', { duration: 2000 })

        setCustomerData(CustomerDataModel)
        setDeliveryData(DeliveryDataModel)
        dispatch(clearCart())

        const paramsObject = urlSearchParamsToObject(searchParams)
        const newParams = { 
          ...paramsObject, 
          order: response.data.data.id,
          email: response.data.data.details.customer_data.email,
        }
        const queryParams = new URLSearchParams(newParams).toString()

        navigate({
          pathname: "/success",
          search: queryParams,
        })
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (table) setDeliveryData({ ...deliveryData, table })
  }, [])

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h3 className="font-semibold">Rechnungsdetails</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleForm}
          className="input-field"
          placeholder="Email"
          required
        />
        <div className="flex gap-1">
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleForm}
            className="input-field"
            placeholder="Vorname"
            required
          />
        </div>
        <textarea
          rows={2}
          name="notes"
          placeholder="Bemerkung"
          className="flex-1 input-field resize-none rounded-md"
          onChange={handleForm}
        />
        <div className="grid grid-cols-12 gap-2">
          <button className="primary-button col-span-6 col-start-7 mt-4">
            {
              isLoading ?
                <Spinner color="text-zinc-500" /> :
                "Bezahlen"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form