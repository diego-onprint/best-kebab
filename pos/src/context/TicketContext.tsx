import { ReactNode, createContext, useContext, useRef } from "react"

const TicketContext = createContext(null)
// const ticketDomRef = createRef()
// const kitchenTicketDomRef = createRef()

export const useTicketContext = () => useContext(TicketContext)

const TicketContextProvider = ({ children }: { children: ReactNode}) => {

  const kitchenTicketDomRef = useRef()
  const ticketDomRef = useRef()

  const values = {
    ticketDomRef,
    kitchenTicketDomRef,
  }

  return (
    <TicketContext.Provider value={values}>
        { children }
    </TicketContext.Provider>
  )
}

export default TicketContextProvider