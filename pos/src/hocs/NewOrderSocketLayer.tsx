import { useEffect } from "react"
import socket from "../socket"
import { useGetTablesDataQuery, useGetOrderDataByIdQuery } from "../store/api/apiSlice"
import { setNotification } from "../store/notification/notificationSlice"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import useRefetchOrderById from "../hooks/useRefetchOrderById"

const NewOrderSocketLayer = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { refetch: refetchTablesData } = useGetTablesDataQuery()
    const { refetchOrderById } = useRefetchOrderById()
    
    useEffect(() => {

        const update = async (args) => {

            if (args.success) {
                dispatch(setNotification({
                    show: true,
                    data: args.response
                }))
            }

            // Revalidate tables
            refetchTablesData()

            // Revalidate updated order
            refetchOrderById(parseInt(args.response.orderId))
        }

        const callStaff = (args) => {
            // Handle staff call notification
            console.log(args)
        }

        socket.on("on-order-update", update)
        socket.on("call-staff", callStaff)

        return () => {
            socket.off("on-order-update", update)
            socket.off("call-staff", callStaff)
        }

    }, [dispatch, refetchTablesData])

    return (
        <div>
            {children}
        </div>
    )
}

export default NewOrderSocketLayer