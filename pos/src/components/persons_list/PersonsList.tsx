import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { setCurrentOrderId } from '../../store/current_order/currentOrderSlice'
import { useGetPersonsDataQuery, useGetTablesDataQuery } from '../../store/api/apiSlice'
import { useEffect } from 'react'
import { updateTables } from '../../store/tables/tablesSlice'
import { socket } from '../../socket'
import type { Order } from '../../types'

const PersonsList = () => {

    const dispatch = useDispatch<AppDispatch>()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const {tables } = useSelector<RootState, { tables: Order[] }>(state => state.tables)
    const { data, refetch } = useGetPersonsDataQuery()

    useEffect(() => {
        const update = () => {
            refetch()
        }
        socket.on("on-order-update", update)
        return () => {
            socket.off("on-order-update", update)
        }
    }, [refetch])

    // Update on first call to data and on each refresh fired by the socket
    useEffect(() => {
        data && dispatch(updateTables(data))
    }, [dispatch, data])

    const selectTable = (id) => {
        dispatch(setCurrentOrderId(id))
    }

    return (
        <div className="grid grid-cols-12 gap-1 py-2">
            {
                tables.length > 0 ?
                    tables.map(table => {
                        return (
                            <article
                                onClick={() => selectTable(table.id)}
                                role="button"
                                tabIndex={0}
                                key={table.uid}
                                className={`${currentOrder.id === table.id && "outline outline-zinc-700"} ${table.data.cart.products.length > 0 ? "bg-green-200" : "bg-white"} col-span-4 md:col-span-3 xl:col-span-3 flex flex-col justify-between h-16 border border-zinc-200 rounded-lg p-2`}
                            >
                                <div className="flex justify-between">
                                    <h3>{table.data.name}</h3>
                                    <div className="flex items-center gap-1">
                                        <p>{table.data.capacity}</p>
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="self-end text-xs">
                                    <span>CHF. </span>
                                    <span className="font-bold">{table.data.cart.total}</span>
                                </p>
                            </article>
                        )
                    }) :
                    <p>Loading...</p>
            }
        </div>
    )
}

export default PersonsList