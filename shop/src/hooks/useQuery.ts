import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom"

const useQuery = () => {

    const { search } = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])

    // return new URLSearchParams(search)
}

export default useQuery