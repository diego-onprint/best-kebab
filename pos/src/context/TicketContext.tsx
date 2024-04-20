import { ReactNode, createContext, createRef, useContext, useState, useRef } from "react"
import { CustomerData } from "../models/customer_data"

const TicketContext = createContext(null)
// const ticketDomRef = createRef()
// const kitchenTicketDomRef = createRef()

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {

  //TODO send this state to ticketSlice!
  const [customerData, setCustomerData] = useState(CustomerData)
  const [orderNumber, setOrderNumber] = useState<string>("")
  const kitchenTicketDomRef = useRef()
  const ticketDomRef = useRef()

  const values = {
    ticketDomRef,
    kitchenTicketDomRef,
    customerData,
    setCustomerData,
    orderNumber,
    setOrderNumber,
  }

  return (
    <TicketContext.Provider value={values}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider