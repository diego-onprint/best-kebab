import { Link } from "react-router-dom"
import { useGetSubCategoriesQuery } from '../../store/api/apiSlice'

const SubcategoriesList = ({ id }: { id: string | undefined }) => {

    const { data, isFetching } = useGetSubCategoriesQuery(id)

    return (
        <>
            {
                isFetching ?
                    <div>Loading...</div> :
                    <div className="grid grid-cols-12 gap-2 py-2">
                        {
                            data.subcategories.map(subcategory => {
                                return (
                                    <Link
                                        to={`/products/${subcategory.id}`}
                                        key={subcategory.id}
                                        className="col-span-6 @xs/main:col-span-4 @md/main:col-span-3 h-24 grid place-items-center border border-zinc-200 bg-white rounded-lg"
                                    >
                                        <h3>{subcategory.name}</h3>
                                    </Link>
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}

export default SubcategoriesList