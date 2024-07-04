import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import TakeawayList from "../../components/takeaway_list/TakeawayList"

const Takeaway = () => {

    const errorMsg = "An error ocurred fetching tables"

    return (
        <div className="flex flex-col h-full">
            <h2 className="section-title">Takeaway</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <TakeawayList />
            </ErrorBoundary>
        </div>
    )
}

export default Takeaway