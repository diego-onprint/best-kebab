import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from '../../store/api/apiSlice'
import type { Category } from '../../types'

const CategoriesList = () => {

    const { data, isLoading } = useGetCategoriesQuery()

    return (
        <>
            {
                isLoading ?
                    <div>Loading...</div> :
                    <div className="grid grid-cols-12 gap-2 py-2">
                        {
                            data?.categories.map((category: Category) => {
                                return (
                                    <Link key={category.id} className="col-span-6 @xs/main:col-span-4 @md/main:col-span-3 aspect-square border border-zinc-00 bg-white rounded-lg" to={`/category/${category.id}`}>
                                        <div className="p-2 flex h-full">
                                            <h3>{category.name}</h3>
                                        </div>
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