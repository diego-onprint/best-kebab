import { useDispatch } from "react-redux"
import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import CategoriesList from "../../components/categories/categories_list/CategoriesList"
import { setAddProductMenu, setEditCategoryMenu } from "../../store/menus/menusSlice"
import type { AppDispatch } from "../../store/store"

const Categories = () => {

    const dispatch = useDispatch<AppDispatch>()
    const errorMsg = "An error ocurred fetching categories"

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center">
                <h2 className="section-title">Kategorien</h2>
                <div className="flex gap-4">
                    <button onClick={() => dispatch(setAddProductMenu(true))} className="bg-white rounded-md p-2 border border-zinc-200">Neues Produkt</button>
                    <button onClick={() => dispatch(setEditCategoryMenu(true))} className="bg-white rounded-md p-2 border border-zinc-200">Kategorien bearbeiten</button>
                </div>
            </div>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <CategoriesList />
            </ErrorBoundary>
        </div>
    )
}

export default Categories