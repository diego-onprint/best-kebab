import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { socket } from "../socket"
import { NewOrderNotificationModel } from "../models/new_order_notification.model"
import type { NewOrderNotification } from "../types"

const NewOrderNotificationContext = createContext(null)

export const useNewOrderNotificationContext = () => useContext(NewOrderNotificationContext)

const NewOrderNotificationContextProvider = ({ children }: { children: ReactNode}) => {

    const [newOrderNotification, setNewOrderNotification] = useState<NewOrderNotification>(NewOrderNotificationModel)

    useEffect(() => {

        const handleSocketNewOrder = () => {
          console.log("NEW-ORDER!!")
          setNewOrderNotification({...newOrderNotification, showNotification: true})
        }
    
        socket.on("new-order", handleSocketNewOrder)
    
        return () => {
          socket.off("new-order", handleSocketNewOrder)
        }
      }, [])

    return (
        <NewOrderNotificationContext.Provider value={{newOrderNotification, setNewOrderNotification}}>
            {children}
        </NewOrderNotificationContext.Provider>
    )
}

export default NewOrderNotificationContextProvider