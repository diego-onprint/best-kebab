import { useParams } from "react-router-dom"
import CategoriesList from "../../components/categories_list/CategoriesList"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"
import SubcategoriesList from "../../components/subcategories_list/SubcategoriesList"

const Subcategories = () => {

    const { id } = useParams()
    const errorMsg = "An error ocurred fetching categories"

    return (
        <div>
            <h2 className="section-title">Categories</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <SubcategoriesList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Subcategories