import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { AppDispatch } from "../store/store"
import { setTableId } from "../store/cart/cartSlice"

const TableProvider = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>()
    const [searchParams] = useSearchParams()
    const tableId = searchParams.get("id")
    
    if (tableId) dispatch(setTableId(tableId))

    return <>{children}</>
}

export default TableProvider