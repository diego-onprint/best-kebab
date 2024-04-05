import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from '../../store/api/apiSlice'
import type { Category } from '../../types'

const CategoriesList = ({ id }: { id: string | undefined }) => {

    const { data, isLoading } = useGetCategoriesQuery(id)

    console.log(data)

    return (
        <>
            {
                isLoading ?
                    <div>Loading...</div> :
                    <div className="grid grid-cols-12 gap-2 py-2">
                        {
                            data?.categories.map((category: Category) => {
                                return (
                                    <Link
                                        to={category.description === "has-subcategories" ? `/categories/${category.id}` : `/category/${category.id}`}
                                        key={category.id}
                                        className="col-span-6 @xs/main:col-span-4 @md/main:col-span-3 h-24 grid place-items-center border border-zinc-200 bg-white rounded-lg"
                                    >
                                        <h3>{category.name}</h3>
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