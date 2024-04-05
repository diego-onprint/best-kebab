import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { setActiveTable } from '../../store/tables/tablesSlice'
import type { Table } from '../../types'

const TablesList = () => {

    const tables = useSelector<RootState, Table[]>(state => state.tables.tables)
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const dispatch = useDispatch<AppDispatch>()

    console.log(activeTable)

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
                            className={`col-span-6 sm:col-span-4 lg:col-span-3 h-24 border border-zinc-200 bg-white rounded-lg ${activeTable === table.id && "outline outline-zinc-700"}`}
                        >
                            <div className="p-2">
                                <h3>{table.name}</h3>
                                {/* <p>CHF. <span className="font-bold">{product.price}</span></p> */}
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default TablesList