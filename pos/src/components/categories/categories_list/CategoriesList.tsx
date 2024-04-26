import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../../store/api/apiSlice"
import type { Category } from "../../../types"

const CategoriesList = () => {

    const { data, error, isFetching } = useGetCategoriesQuery()

    //case not found -404- or sorts
    if (error) throw Error

    return (
        <>
            {
                isFetching ?
                    <div>Loading...</div> :
                    <div className="grid grid-cols-12 gap-2 py-2">
                        {
                            data.map((category: Category) => {

                                const to = category.subcategories ? `/subcategories/${category.category_id}` : `/products/${category.category_id}`

                                return (
                                    <Link
                                        to={to}
                                        key={category.category_uid}
                                        className="col-span-6 @xs/main:col-span-4 @md/main:col-span-3 h-24 grid place-items-center border border-zinc-200 bg-white rounded-lg"
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