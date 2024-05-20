import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../../store/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import type { Category } from "../../../types"
import type { AppDispatch, RootState } from "../../../store/store"
import { setCustomProductMenu } from "../../../store/menus/menusSlice"

const CategoriesList = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { data, error, isFetching } = useGetCategoriesQuery()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)

    //case not found -404- or sorts
    if (error) throw Error

    return (
        <>
            {
                isFetching ?
                    <div>Loading...</div> :
                    <div className="grid grid-cols-12 gap-2 py-2">
                        <button
                        disabled={!currentOrder.data}
                        onClick={() => dispatch(setCustomProductMenu(true))}
                        className={`${!currentOrder.data && "opacity-30 cursor-default"} col-span-6 @xs/main:col-span-4 @md/main:col-span-3 h-24 grid place-items-center bg-slate-200 rounded-lg`}>
                            Custom product
                        </button>
                        {
                            data.map((category: Category) => {

                                const to = category.subcategories ? `/subcategories/${category.category_id}` : `/products/${category.category_id}`

                                return (
                                    <Link
                                        to={to}
                                        key={category.category_uid}
                                        className={`${!currentOrder.data && "opacity-30 cursor-default"} col-span-6 @xs/main:col-span-4 @md/main:col-span-3 h-24 grid place-items-center border border-zinc-200 bg-white rounded-lg`}
                                    >
                                        <h3>{category.category_name}</h3>
                                    </Link>
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}

export default CategoriesList