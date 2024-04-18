import { ReactNode, useState } from 'react'
import { useTicketContext } from '../../../context/TicketContext'
import { printTicket } from '../../../utils/print/printTicket'

const PrintButton = ({ 
    children,
    loading = false,
    disabled = false,
    buttonStyle = "",
}: 
{ 
    children: ReactNode
    loading?: boolean
    disabled?: boolean
    buttonStyle: string
}) => {

    const [notification, setNotification] = useState(false)
    const { ticketDomRef } = useTicketContext()


    const handlePrint = () => {
        printTicket(ticketDomRef.current)
        setNotification(true)
        setTimeout(() => setNotification(false), 2000)
    }

    return (
        <>
            <button onClick={handlePrint} disabled={loading || disabled} className={buttonStyle}>
                { children }
            </button>
            {
                notification ?
                    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-3 bg-white p-4 rounded-md shadow z-50">
                        <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p>Order printed</p>
                    </div> : null
            }
        </>
    )
}

export default PrintButton