import { ReactNode, createContext, useContext, useState } from "react"

// TODO Migrate to Redux

const TicketContext = createContext(null)

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {

  const [ ticket, setTicket ] = useState("")
  
  const values = { ticket, setTicket }

  return (
    <TicketContext.Provider value={values}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider