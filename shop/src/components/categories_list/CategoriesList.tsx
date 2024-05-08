import { useGetCategoriesQuery } from "../../store/api/apiSlice"
import { useSearchParams } from "react-router-dom"
import Spinner from "../common/spinner/Spinner"

const CategoriesList = () => {

    const { data: categories, error, isFetching } = useGetCategoriesQuery()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleClick = (id) => {
        setSearchParams({ ...searchParams, category: id })
    }

    if (isFetching) {
        return (
            <div className="w-full h-full grid place-items-center bg-neutral-100">
                <Spinner color="text-zinc-300" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-12 gap-2 flex-1 overflow-y-auto pt-20 pb-24 px-2 bg-neutral-100">
            {
                categories.map(category => {
                    return (
                        <article
                            key={category.id}
                            onClick={() => handleClick(category.id)}
                            className="h-40 overflow-hidden col-span-6 sm:col-span-4 lg:col-span-3 border border-zinc-100 bg-white rounded-lg flex flex-col shadow-sm"
                        >
                            <img src={category.img} alt="" className="object-cover h-28" />
                            <h3 className="font-semibold text-center p-2">{category.name}</h3>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default CategoriesList