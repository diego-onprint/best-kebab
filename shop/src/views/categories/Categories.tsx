import CategoriesList from "../../components/categories_list/CategoriesList"

// TODO only show cart if products added

const Categories = () => {

    return (
        <div className="w-full flex flex-col flex-1">
            <div className="section-header grid place-items-center">
                <h3 className="text-center font-semibold">Select category</h3>
            </div>
            <CategoriesList />
        </div>
    )
}

export default Categories