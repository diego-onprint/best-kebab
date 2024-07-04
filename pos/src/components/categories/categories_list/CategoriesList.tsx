import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../../store/api/apiSlice"
import Spinner from "../../common/spinner/Spinner"
import type { Category } from "../../../types"

const CategoriesList = () => {

    const { data, error, isFetching } = useGetCategoriesQuery()
    const categories = data?.filter(category => category.parent.includes('pos'))
    
    //case not found -404- or sorts
    if (error) throw Error

    return (
        <>
            {
                !isFetching && categories ?
                    <div className="grid grid-cols-12 gap-2 py-2">
                        {
                            categories.map((category: Category) => {

                                let to = ""

                                if (category.has_subcategories) {
                                    to = `/subcategories/${category.id}`
                                } else {
                                    to = `/products/${category.id}`
                                }

                                return (
                                    <Link
                                        to={to}
                                        key={category.uid}
                                        className={`p-2 col-span-6 @xs/main:col-span-4 @md/main:col-span-3 h-24 grid place-items-center border border-zinc-200 bg-white rounded-lg`}
                                    >
                                        <h3 className="truncate w-11/12 text-center">{category.name}</h3>
                                    </Link>
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

export default CategoriesList