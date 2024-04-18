import { useParams } from "react-router-dom"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import SubcategoriesList from "../../components/categories/subcategories_list/SubcategoriesList"
import ReturnButton from "../../components/common/return_button/ReturnButton"

const Subcategories = () => {

    const { id } = useParams()
    const errorMsg = "An error ocurred fetching categories"

    return (
        <div>
            <div className="flex items-center gap-2">
                <ReturnButton />
                <h2 className="section-title">Subcategories</h2>
            </div>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <SubcategoriesList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Subcategories