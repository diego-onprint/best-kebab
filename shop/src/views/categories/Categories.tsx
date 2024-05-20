import CategoriesList from "../../components/categories_list/CategoriesList"
import useNavigation from "../../hooks/useNavigation"

// TODO only show cart if products added

const Categories = () => {

    const { toOrdersView } = useNavigation()

    return (
        <div className="w-full flex flex-col flex-1">
            <div className="section-header grid place-items-center relative min-h-16">
                <h3 className="text-center font-semibold">Select category</h3>
                <button onClick={toOrdersView} className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </button>
            </div>
            <CategoriesList />
        </div>
    )
}

export default Categories