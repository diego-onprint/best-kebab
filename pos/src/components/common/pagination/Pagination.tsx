
const Pagination = ({ page, setPage, hasNextPage, loading }) => {

    return (
        <div className="flex bg-white border border-zinc-200 rounded-md py-1">
            <button
                onClick={() => setPage(page - 1)}
                className="w-6 flex justify-center items-center disabled:opacity-30"
                disabled={page === 1 || loading}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="text-blue-500 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <p className={`bg-white w-6 text-center ${loading && "opacity-30"}`}>{page}</p>
            <button
                onClick={() => setPage(page + 1)}
                className="w-6 flex justify-center items-center disabled:opacity-30"
                disabled={!hasNextPage || loading}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="text-blue-500 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    )
}

export default Pagination