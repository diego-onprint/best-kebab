import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { setActiveTable } from '../../store/tables/tablesSlice'
import type { Table } from '../../types'

const TablesList = () => {

    const dispatch = useDispatch<AppDispatch>()
    const tables = useSelector<RootState, Table[]>(state => state.tables.tables)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)

    const handleTable = (id: Table["id"]) => {
        dispatch(setActiveTable(id))
    }

    return (
        <div className="grid grid-cols-12 gap-2 py-2">
            {
                tables.map(table => {
                    return (
                        <article
                            onClick={() => handleTable(table.id)}
                            role="button"
                            tabIndex={0}
                            key={table.id}
                            className={`${activeTable === table.id && "outline outline-zinc-700"} ${table.cart.products.length > 0 ? "bg-green-200" : "bg-white"} col-span-6 sm:col-span-4 lg:col-span-3 flex flex-col justify-between h-24 border border-zinc-200 rounded-lg p-2`}
                        >
                            <div className="flex justify-between">
                                <h3>{table.name}</h3>
                                <div className="flex items-center gap-1">
                                    <p>{table.capacity}</p>
                                    <svg className="w-4 h-4 relative top-[1px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="self-end">
                                <span>CHF. </span>
                                <span className="font-bold">{table.cart.total}</span>
                            </p>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default TablesList