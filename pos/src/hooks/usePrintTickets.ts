import { useEffect } from "react"
import { useTicketContext } from "../context/TicketContext"

const usePrintTickets = () => {

    const { ticket, setTicket } = useTicketContext()

    const printClientTicket = () => setTicket("client")

    const printKitchenTicket = () => setTicket("kitchen")

    useEffect(() => {

        ticket !== "" && window.print()
        setTicket("")

    }, [ticket, setTicket])

    return {
        printClientTicket,
        printKitchenTicket
    }
}

export default usePrintTickets