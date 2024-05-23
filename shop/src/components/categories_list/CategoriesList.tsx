import { useGetCategoriesQuery } from "../../store/api/apiSlice"
import { useSearchParams } from "react-router-dom"
import Spinner from "../common/spinner/Spinner"
import { urlSearchParamsToObject } from "../../utils/urlSearchParamsToObject"

const CategoriesList = () => {

    const { data: categories, error, isFetching } = useGetCategoriesQuery()
    const [searchParams, setSearchParams] = useSearchParams()

    if (error) throw error

    const handleClick = (id) => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, category: id })
    }

    if (isFetching) {
        return (
            <div className="w-full h-full grid place-items-center bg-neutral-100">
                <Spinner color="text-zinc-300" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-12 gap-2 flex-1 pt-4 pb-24 px-2 bg-neutral-100">
            {
                categories.map(category => {
                    return (
                        <article
                            key={category.category_uid}
                            onClick={() => handleClick(category.category_id)}
                            className="h-40 overflow-hidden col-span-6 sm:col-span-4 lg:col-span-3 border border-zinc-100 bg-white rounded-lg flex flex-col shadow-sm"
                        >
                            <img src={category.category_image} alt="" className="object-cover h-28" />
                            <h3 className="font-semibold text-center p-2">{category.category_name}</h3>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default CategoriesList