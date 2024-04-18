import { ReactNode, createContext, createRef, useContext, useState } from "react"
import { CustomerData } from "../models/customer_data"

const TicketContext = createContext(null)
const ticketDomRef = createRef()

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {

  const [customerData, setCustomerData] = useState(CustomerData)

  return (
    <TicketContext.Provider value={{ticketDomRef, customerData, setCustomerData}}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider