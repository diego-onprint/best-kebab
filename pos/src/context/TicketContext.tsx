import { ReactNode, createContext, useContext, useRef, useState } from "react"

// TODO Migrate to Redux

const TicketContext = createContext(null)

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {

  const [ ticket, setTicket ] = useState(null)
  const kitchenTicketDomRef = useRef()
  const shopTicketDomRef = useRef()
  
  const values = { ticket, setTicket, kitchenTicketDomRef, shopTicketDomRef }

  return (
    <TicketContext.Provider value={values}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider