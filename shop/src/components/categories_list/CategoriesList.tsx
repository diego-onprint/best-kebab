import { Dispatch, SetStateAction } from "react"
import { Category } from "../../types"
import useQuery from "../../hooks/useQuery"
import { useSearchParams } from "react-router-dom"

type PropsTypes = {
    categories: Category[]
}

const CategoriesList = ({ categories }: PropsTypes) => {

    // console.log(categories)

    const query = useQuery()
    const [_, setSearchParams] = useSearchParams()

    // const category = query.get("category")

    const handleClick = (id: Category["id"]) => {
        setSearchParams({"category": id})
    }

    // console.log(category)

    return (
        <div className="w-full flex flex-col h-s[80vh]">
            <div className="relative p-3 border-b border-zinc-200">
                <h3 className="text-center font-semibold">Select category</h3>
            </div>
            <div className="grid grid-cols-12 gap-2 flex-1 h-80 overflow-y-auto py-3 px-2 bg-neutral-100">
                {
                    categories.map(category => {
                        return (
                            <article onClick={() => handleClick(category.id)} key={category.id} className="col-span-6 sm:col-span-4 lg:col-span-3 border border-zinc-100 bg-white rounded-lg p-2 flex flex-col shadow-sm">
                                {/* <img src={product.images[0].src} className="w-full h-24 object-cover rounded-md" /> */}
                                <div className="p-1 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3>{category.name}</h3>
                                    </div>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoriesList