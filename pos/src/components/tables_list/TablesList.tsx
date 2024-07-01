import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { setCurrentOrder } from '../../store/current_order/currentOrderSlice'
import { useGetTablesDataQuery } from '../../store/api/apiSlice'
import Spinner from '../common/spinner/Spinner'
import type { CurrentOrder } from '../../types'

const TablesList = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { currentOrderId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { data: tables, error, refetch } = useGetTablesDataQuery()

    if (error) console.log(error)

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <>
            {
                tables ?
                    <div className="grid grid-cols-12 gap-1 py-2">
                        {
                            tables.map(table => {
                                return (
                                    <article
                                        onClick={() => dispatch(setCurrentOrder(table.id))}
                                        role="button"
                                        tabIndex={0}
                                        key={table.id}
                                        className={`${currentOrderId === table.id && "outline outline-zinc-700"} ${table.cart?.products.length > 0 ? "bg-blue-500 text-white font-semibold" : "bg-white"} col-span-4 xl:col-span-3 flex flex-col justify-between h-16 border border-zinc-200 rounded-lg p-2`}
                                    >
                                        <div className="flex justify-between">
                                            <h3>{table.name}</h3>
                                            <div className="flex items-center text-xs">
                                                <p>{table.capacity}</p>
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="self-end text-xs">
                                            <span>CHF </span>
                                            <span className="font-bold">{table.cart.total.toFixed(2)}</span>
                                        </p>
                                    </article>
                                )
                            })
                        }
                    </div> :
                    <div className="flex-1 grid place-items-center">
                        <Spinner color="text-zinc-300" />
                    </div>
            }
        </>
    )
}

export default TablesList