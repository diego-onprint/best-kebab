import { useDispatch } from "react-redux"
import { setTicketType } from "../store/ticket/ticketSlice"
import type { AppDispatch } from "../store/store"
import type { TicketType } from "../types"
// import { printRawbt } from "../utils/print/printRawbt"

const usePrintTickets = () => {

    const dispatch = useDispatch<AppDispatch>()

    const handlePrint = (type: TicketType ) => {

        dispatch(setTicketType(type))

        setTimeout(() => {

            window.print()
            // printRawbt()

        }, 500)
    }
    
    return { handlePrint }
}

export default usePrintTickets