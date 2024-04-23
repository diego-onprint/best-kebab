import { ReactNode, createContext, useContext, useRef, useState } from "react"

const TicketContext = createContext(null)

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {

  const ticketDomRef = useRef()
  const kitchenTicketDomRef = useRef()
  const specialKitchenTicketDomRef = useRef()
  const [wooOrderNumber, setWooOrderNumber] = useState(0)

  const values = {
    ticketDomRef,
    kitchenTicketDomRef,
    specialKitchenTicketDomRef,
    wooOrderNumber,
    setWooOrderNumber,
  }

  return (
    <TicketContext.Provider value={values}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider