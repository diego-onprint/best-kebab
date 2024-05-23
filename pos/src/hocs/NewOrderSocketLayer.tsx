/*
    Handle incoming socket data. Set notification for new orders globally.
    Update the tables data whenever there is a change in an order, whether it is
    an order generated from the pos or from the front shop.
*/

import { useEffect } from "react"
import { socket } from "../socket"
import { useGetTablesDataQuery } from "../store/api/apiSlice"
import { setNotification } from "../store/notification/notificationSlice"
import { updateTables } from "../store/tables/tablesSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"

const NewOrderSocketLayer = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { data, refetch } = useGetTablesDataQuery()

    useEffect(() => {

        const update = (args) => {

            if (args.success && args.data.fromShop) {
                dispatch(setNotification({
                    show: true,
                    data: args.data
                }))
            }

            refetch()
        }

        socket.on("on-order-update", update)

        return () => {
            socket.off("on-order-update", update)
        }

    }, [dispatch, refetch])

    // Update on first call to data and on each refresh fired by the socket
    useEffect(() => {
        data && dispatch(updateTables(data))
    }, [dispatch, data])

    return (
        <div>
            {children}
        </div>
    )
}

export default NewOrderSocketLayer