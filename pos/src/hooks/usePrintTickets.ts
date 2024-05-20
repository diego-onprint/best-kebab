import { useEffect } from "react"
import { useTicketContext } from "../context/TicketContext"

const usePrintTickets = () => {

    const { ticket, setTicket } = useTicketContext()

    const printShopTicket = () => setTicket("shop")

    const printKitchenTicket = () => setTicket("kitchen")

    const printClientTicket = () => setTicket("client")

    useEffect(() => {

        if (ticket) {
            window.print() 
            setTicket(null)
        }

    }, [ticket, setTicket])

    return {
        printShopTicket,
        printKitchenTicket,
        printClientTicket,
    }
}

export default usePrintTickets