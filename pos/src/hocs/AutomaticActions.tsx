import { useEffect } from 'react'
import { useDeleteOldDeletedOrdersMutation } from '../store/api/apiSlice'

const AutomaticActions = ({ children }) => {

    const [deleteOldDeletedOrders] = useDeleteOldDeletedOrdersMutation()

    useEffect(() => {

        const handleDelete = async () => {
            await deleteOldDeletedOrders()
        }

        handleDelete()

    }, [deleteOldDeletedOrders])


    return children
}

export default AutomaticActions