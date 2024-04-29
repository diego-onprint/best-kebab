import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import type { Order, Table } from '../../../types'
import { setCurrentOrder } from '../../../store/orders/ordersSlice'
import { useEffect } from 'react'
import { useGetTablesDataQuery } from '../../../store/api/apiSlice'

const TablesList = () => {

    // const dispatch = useDispatch<AppDispatch>()
    // const orders = useSelector<RootState, Order[]>(state => state.orders.orders)
    // const currentOrder = useSelector<RootState, Order["id"]>(state => state.orders.currentOrder)
    // const tables = orders.filter(order => order.isTable)

    // const handleTable = (id: Table["id"]) => {
    //     dispatch(setCurrentOrder(id))
    // }

    const { data: tables, error, isFetching } = useGetTablesDataQuery()

    useEffect(() => {
        // UPDATE TABLES ORDERS STATE FROM DB DATA        
        // EVERY 30 SECONDS SO IF ONE TABLE IS IN THIS SECTION
        // AND OTHER TABLET ADD PRODUCTS IT WILL BE SYNCED OR
        // USE SOCKETS, EMIT EVENT WHEN TABLES ARE UPDATED
    }, [])
    
    console.log(tables)

    return (
        <div className="grid grid-cols-12 gap-2 py-2">
            {
                isFetching ?
                <p>Loading...</p> :
                tables.map(table => {
                    return (
                        <article
                            // onClick={() => handleTable(table.id)}
                            role="button"
                            tabIndex={0}
                            key={table.id}
                            // className={`col-span-6 md:col-span-4 xl:col-span-4 ${currentOrder === table.id && "outline outline-zinc-700"} ${table.cart.products.length > 0 ? "bg-green-200" : "bg-white"} flex flex-col justify-between h-24 border border-zinc-200 rounded-lg p-2`}
                            className={`${table.data.cart.products.length > 0 ? "bg-green-200" : "bg-white"} col-span-6 md:col-span-4 xl:col-span-4 flex flex-col justify-between h-24 border border-zinc-200 rounded-lg p-2`}
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
                            <p className="self-end">
                                <span>CHF. </span>
                                <span className="font-bold">{table.data.cart.total}</span>
                            </p>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default TablesList