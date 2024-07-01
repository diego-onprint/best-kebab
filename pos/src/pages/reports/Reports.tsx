import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import ReportsDashboard from "../../components/reports/ReportsDashboard"

const Reports = () => {
  return (
    <div>
        <h2 className="section-title">Reports</h2>
        <ErrorBoundary fallback={<ErrorFallback>Error fetching reports</ErrorFallback>}>
          <ReportsDashboard />
        </ErrorBoundary>
    </div>
  )
}

export default Reports