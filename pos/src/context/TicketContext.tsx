import { ReactNode, createContext, createRef, useContext } from "react"

const TicketContext = createContext(null)
const ticketDomRef = createRef()

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {
  return (
    <TicketContext.Provider value={ticketDomRef}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider