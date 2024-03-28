import CategoriesList from "../../components/categories_list/CategoriesList"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"

const Categories = () => {

    const errorMsg = "An error ocurred fetching categories"

    return (
        <div>
            <h2 className="section-title">Categories</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <CategoriesList />
            </ErrorBoundary>
        </div>
    )
}

export default Categories